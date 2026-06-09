import { createServerOnlyFn } from "@tanstack/react-start";
import mongoose from "mongoose";

const MONGODB_URI = createServerOnlyFn(() => process.env.MONGODB_URI!)();

declare global {
    var mongoosePromise: Promise<typeof mongoose> | undefined;
}

export async function dbConnect() {
    if (mongoose.connection.readyState === 1) {
        return mongoose;
    }

    if (!global.mongoosePromise) {
        global.mongoosePromise = mongoose.connect(MONGODB_URI);
    }

    return global.mongoosePromise;
}