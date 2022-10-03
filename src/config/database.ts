import mongoose from "mongoose";

const userName = "Guchi";
const password = "kLCaYJRdDj380Cdo@";
const cluster = "cluster0";
const dataBaseName = "typescript-auth-db";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Database Connection Failed");
        process.exit(1);
    }
}