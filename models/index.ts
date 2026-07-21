import { connect } from "mongoose";
export * from "./Admin";
export * from "./Patient";
export * from "./StaffApplication";
export * from "./BlogPost";
const MONGODB_URI = process.env.MONGODB_URI!;
export const connectDB = async () => {
  try {
    await connect(MONGODB_URI);
    console.log("MongoDB Connected🎉✨");
  } catch (error) {
    console.log(error);
  }
};
connectDB();