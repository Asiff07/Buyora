import redisClient from '../config/redis.js'; // Ensure this path matches your redis config location

export const rateLimiter = ({ keyPrefix, limit, windowSeconds }) => {
    return async (req, res, next) => {
        try {
            
            const identifier = req.body.userId || req.user?._id?.toString() || req.ip;

            if (!identifier) {
                return res.status(400).json({ success: false, message: 'Unable to identify client' });
            }
            const redisKey = `${keyPrefix}:${identifier}`;

            // Increment request count
            const current = await redisClient.incr(redisKey);

            // Ensure TTL exists
            let ttl = await redisClient.ttl(redisKey);
            if (ttl === -1) {
                await redisClient.expire(redisKey, windowSeconds);
                ttl = windowSeconds;
            }

            // Limit exceeded
            if (current > limit) {
                res.set('Retry-After', ttl);
                return res.status(429).json({
                    success: false,
                    message: 'Too many requests. Please slow down.',
                    retryAfterSeconds: ttl,
                });
            }
            

            return next();
        } catch (err) {
            console.error('Rate limiter error:', err);
            return next(); // Fail open if Redis is down
        }
    };
};