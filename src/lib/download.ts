import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function generateDownloadToken(orderItemId: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // Token valid for 24 hours

  await prisma.download.create({
    data: {
      orderItemId,
      token,
      expiresAt,
    },
  });

  return token;
}

export async function verifyDownloadToken(token: string) {
  const download = await prisma.download.findUnique({
    where: { token },
    include: { 
      orderItem: {
        include: { book: true }
      }
    },
  });

  if (!download) return null;
  if (download.expiresAt < new Date()) return null;

  return download;
}
