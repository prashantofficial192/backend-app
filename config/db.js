/**
 * The responsbility of this file is to connect to MongoDB Atlas using mongoose.
 * As soon as the connection is established, a success message is logged to the console.
 * If the connection fails, an error message is logged to the console and the process is exited.
 */

import mongoose from "mongoose";

async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed");
        process.exit(1);
    }
}

export default connectMongoDB