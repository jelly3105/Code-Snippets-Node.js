import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const databaseConnectionURL = process.env.DATABASECONNECTIONURL as string;

export async function connectToDB() {
    await mongoose.connect(databaseConnectionURL);
    console.log("Database connected");
}