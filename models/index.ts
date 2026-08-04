import { connect, connection } from "mongoose";
export * from "./Admin";
export * from "./Patient";
export * from "./StaffApplication";
export * from "./BlogPost";
const MONGODB_URI = process.env.MONGODB_URI!;
export const connectDB = async () => {
  if (connection.readyState === 1) {
    return;
  }

  try {
    await connect(MONGODB_URI);
    console.log("MongoDB Connected🎉✨");
  } catch (error) {
    console.error(error);
    throw error;
  }
};
connectDB().catch((error) => {
  console.error("Initial MongoDB connection failed:", error);
});