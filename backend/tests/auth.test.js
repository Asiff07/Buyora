import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import redisClient from "../config/redis.js";

describe("Auth API Integration Tests", () => {
    // Close network handles to let Jest exit cleanly
    afterAll(async () => {
        await mongoose.connection.close();
        await redisClient.quit();
    });

    test("POST /api/users/login - Should fail with success: false for incorrect credentials", async () => {
        const res = await request(app)
            .post("/api/users/login")
            .send({
                email: "invalid-user@test.com",
                password: "wrongpassword"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(false);
    });

    test("POST /api/users/admin - Should successfully authenticate admin and return token", async () => {
        const res = await request(app)
            .post("/api/users/admin")
            .send({
                email: process.env.ADMIN_EMAIL || "skasif@gmail.com",
                password: process.env.ADMIN_PASSWORD || "Skasif@7860"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.token).toBeDefined();
    });
});
