import { connect } from "mongoose";
export * from "./Admin";

const MONGODB_URI = process.env.MONGODB_URI!;

export const connectDB = async () => {
  try {
    await connect(MONGODB_URI);
    console.log("MongoDB Connected🎉✨");
  } catch (error) {
    console.log(error);
  }
};
