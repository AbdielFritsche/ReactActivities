import mongoose from "mongoose";
import { connect } from "mongoose";

export const conectDB = async () =>
{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB conectada")
};

