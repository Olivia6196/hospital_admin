import { Admin, connectDB } from "@/models";
import bcrypt from "bcryptjs";

async function seedAdmin() {
  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({ email: "admin@hospital.com" });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin1234", 10);

    const admin = await Admin.create({
      email: "admin@hospital.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created:", admin.email);
    process.exit();
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin();