"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createOrder(data: {
  userId: string;
  totalAmount: number;
  shippingCharge: number;
  items: Array<{ bookId: string; quantity: number; price: number; format: string }>;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  paymentGateway: string;
}) {
  try {
    const order = await prisma.order.create({
      data: {
        userId: data.userId,
        totalAmount: data.totalAmount,
        shippingCharge: data.shippingCharge,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode,
        paymentGateway: data.paymentGateway,
        items: {
          create: data.items.map((item) => ({
            bookId: item.bookId,
            quantity: item.quantity,
            price: item.price,
            format: item.format,
          })),
        },
      },
    });

    // Update stocks (simplistic)
    for (const item of data.items) {
      if (item.format === "Physical") {
        await prisma.book.update({
          where: { id: item.bookId },
          data: { stock: { decrement: item.quantity } },
        });
      }
    }

    revalidatePath("/admin/orders");
    revalidatePath("/user/dashboard");
    return { success: true, orderId: order.id };
  } catch (error: any) {
    console.error("Order creation error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateOrderStatus(orderId: string, status: any) {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
    revalidatePath("/admin/orders");
    return { success: true, order };
  } catch (error: any) {
    console.error("Failed to update order status:", error);
    return { success: false, error: error.message };
  }
}

export async function getUserOrders(userId: string) {
  try {
    return await prisma.order.findMany({
      where: { userId },
      include: { 
        items: {
          include: { book: true }
        }
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch user orders:", error);
    return [];
  }
}

export async function getAdminDashboardStats() {
  try {
    const totalOrders = await prisma.order.count();
    const paidOrders = await prisma.order.count({ where: { paymentStatus: "PAID" } });
    const totalRevenue = await prisma.order.aggregate({
      where: { paymentStatus: "PAID" },
      _sum: { totalAmount: true },
    });
    const totalBooks = await prisma.book.count();
    const totalUsers = await prisma.user.count();

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });

    return {
      revenue: totalRevenue._sum.totalAmount || 0,
      orderCount: totalOrders,
      paidOrderCount: paidOrders,
      bookCount: totalBooks,
      userCount: totalUsers,
      recentOrders,
    };
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    return null;
  }
}
