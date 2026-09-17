import { connect, connection } from "mongoose";

export * from "./Admin";
export * from "./Patient";
export * from "./StaffApplication";
export * from "./staff";
export * from "./BlogPost";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined. Set the environment variable before connecting to MongoDB.");
  }

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