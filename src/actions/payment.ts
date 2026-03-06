"use server";

import Razorpay from "razorpay";
import crypto from "crypto";
import prisma from "@/lib/prisma";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "razorpay_secret_placeholder",
});

export async function createRazorpayOrder(amount: number, orderId: string) {
  try {
    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency: "INR",
      receipt: orderId,
    };

    const order = await razorpay.orders.create(options);
    return { success: true, order };
  } catch (error: any) {
    console.error("Razorpay Order Creation Error:", error);
    return { success: false, error: error.message };
  }
}

export async function verifyPayment(
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string,
  internalOrderId: string
) {
  try {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "razorpay_secret_placeholder")
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update order in database
      await prisma.order.update({
        where: { id: internalOrderId },
        data: {
          paymentStatus: "PAID",
          status: "PROCESSING",
          paymentId: razorpay_payment_id,
        },
      });

      return { success: true };
    } else {
      return { success: false, error: "Signature mismatch" };
    }
  } catch (error: any) {
    console.error("Payment Verification Error:", error);
    return { success: false, error: error.message };
  }
}
