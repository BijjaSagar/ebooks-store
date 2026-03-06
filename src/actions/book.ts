"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBook(formData: any) {
  try {
    const book = await prisma.book.create({
      data: {
        title: formData.title,
        slug: formData.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
        author: formData.author,
        description: formData.description,
        isbn: formData.isbn,
        pricePhysical: parseFloat(formData.pricePhysical) || 0,
        priceDigital: parseFloat(formData.priceDigital) || 0,
        stock: parseInt(formData.stock) || 0,
        imageUrl: formData.imageUrl,
        googleBooksId: formData.googleBooksId,
        categoryId: formData.categoryId,
        formatHardcover: formData.pricePhysical > 0,
        formatPDF: formData.priceDigital > 0,
      },
    });

    revalidatePath("/admin/books");
    revalidatePath("/");
    return { success: true, book };
  } catch (error: any) {
    console.error("Failed to create book:", error);
    return { success: false, error: error.message };
  }
}

export async function getBooks(filters?: { categoryId?: string; search?: string }) {
  try {
    const where: any = {};
    if (filters?.categoryId && filters.categoryId !== "All") {
      where.categoryId = filters.categoryId;
    }
    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { author: { contains: filters.search, mode: "insensitive" } },
        { isbn: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    const books = await prisma.book.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    return books;
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return [];
  }
}

export async function getBookById(id: string) {
  try {
    return await prisma.book.findUnique({
      where: { id },
      include: { category: true },
    });
  } catch (error) {
    console.error("Failed to fetch book:", error);
    return null;
  }
}

export async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}
