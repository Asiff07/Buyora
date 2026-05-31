import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import redisClient from "../config/redis.js";

describe("Product API Integration Tests", () => {
    // Close network handles to let Jest exit cleanly
    afterAll(async () => {
        await mongoose.connection.close();
        await redisClient.quit();
    });

    test("GET /api/product/list - Should retrieve list of products with 200 status", async () => {
        const res = await request(app)
            .get("/api/product/list?page=1&limit=10");

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.products)).toBe(true);
    });

    test("GET /api/product/invalid-id-xyz - Should fail with 500 for invalid ID format", async () => {
        const res = await request(app)
            .get("/api/product/invalid-id-xyz");

        expect(res.statusCode).toBe(500);
        expect(res.body.success).toBe(false);
    });
});
