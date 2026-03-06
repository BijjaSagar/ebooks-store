import { NextRequest, NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/download";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const token = params.token;
  const download = await verifyDownloadToken(token);

  if (!download) {
    return new NextResponse("Invalid or expired download link", { status: 403 });
  }

  // Mark as downloaded
  await prisma.download.update({
    where: { id: download.id },
    data: { downloaded: true },
  });

  // In a real app, you would fetch from S3/Cloud Storage
  // For now, we simulate a PDF response or redirect to a secure signed URL
  
  const bookTitle = download.orderItem.book.title;
  const pdfUrl = download.orderItem.book.pdfUrl;

  if (!pdfUrl) {
    return new NextResponse("File not found on server", { status: 404 });
  }

  // Simulate serving the file
  // return NextResponse.redirect(pdfUrl); // If redirected to signed URL
  
  return new NextResponse(`Download initiated for: ${bookTitle}`, {
      headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${bookTitle.replace(/ /g, "_")}.pdf"`,
      }
  });
}
