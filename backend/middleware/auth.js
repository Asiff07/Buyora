import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Not Authorized. Login Again." });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        // CHANGE: Log a simple message instead of the full stack trace
        console.log(`[AUTH ERROR] ${error.message}`); 
        
        // Return success: false so the frontend handles it
        return res.json({ success: false, message: error.message });
    }
}

export default authUser;