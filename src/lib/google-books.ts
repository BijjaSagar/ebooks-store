import axios from "axios";

export interface GoogleBookInfo {
  title: string;
  author: string;
  description: string;
  imageUrl?: string;
  isbn: string;
  googleBooksId: string;
  categories: string[];
}

export async function fetchBookByISBN(isbn: string): Promise<GoogleBookInfo | null> {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );

    if (response.data.totalItems === 0) {
      return null;
    }

    const book = response.data.items[0];
    const info = book.volumeInfo;

    return {
      title: info.title || "Unknown Title",
      author: info.authors ? info.authors.join(", ") : "Unknown Author",
      description: info.description || "No description available.",
      imageUrl: info.imageLinks?.thumbnail?.replace("http://", "https://"),
      isbn: isbn,
      googleBooksId: book.id,
      categories: info.categories || [],
    };
  } catch (error) {
    console.error("Error fetching book from Google Books API:", error);
    return null;
  }
}
