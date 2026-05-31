import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
    // Workaround for Node.js DNS resolution issues with SRV records on Windows
    const servers = dns.getServers();
    if (!servers || servers.length === 0 || servers.includes("127.0.0.1") || servers.includes("::1")) {
        dns.setServers(["8.8.8.8", "1.1.1.1"]);
    }

    mongoose.connection.on("connected", () => {
        console.log("MongoDB connected successfully");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
}

export default connectDB;