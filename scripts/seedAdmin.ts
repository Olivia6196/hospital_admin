import { Admin, connectDB } from "@/models";
import bcrypt from "bcryptjs";

async function seedAdmin() {
  await connectDB();

  const existingAdmin = await Admin.findOne({ email: "admin@hospital.com" });

  if (existingAdmin) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash("admin1234", 10);

  const admin = await Admin.create({
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin created:", admin.email);
  process.exit();
}

seedAdmin();