import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import redisClient from "../config/redis.js";

describe("Order API Integration Tests", () => {
    // Close network handles to let Jest exit cleanly
    afterAll(async () => {
        await mongoose.connection.close();
        await redisClient.quit();
    });

    test("POST /api/order/place - Should fail with success: false when auth token is missing", async () => {
        const res = await request(app)
            .post("/api/order/place")
            .send({
                items: [],
                amount: 100,
                address: {}
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toContain("Not Authorized");
    });
});
