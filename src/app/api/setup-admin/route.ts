import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const adminEmail = "admin@delhibooks.com";
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      if (existingAdmin.role !== "ADMIN") {
        await prisma.user.update({
          where: { email: adminEmail },
          data: { role: "ADMIN" },
        });
        return NextResponse.json({ message: "Updated existing admin@delhibooks.com user to ADMIN role." });
      }
      return NextResponse.json({ message: "Admin account already exists! Login with admin@delhibooks.com" });
    }

    const hashedPassword = await bcrypt.hash("admin123", 12);

    await prisma.user.create({
      data: {
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: "Default admin created successfully!",
      credentials: {
        email: "admin@delhibooks.com",
        password: "admin123"
      },
      loginUrl: "/auth/signin",
      adminPanelUrl: "/admin/dashboard"
    });
  } catch (error: any) {
    console.error("Failed to setup admin:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
