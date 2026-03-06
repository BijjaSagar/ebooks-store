# Delhi Books - Modern Bookstore Ecommerce Platform

A premium Next.js 15+ bookstore featuring physical and digital book sales, ISBN automation, and multi-gateway payments.

## 🚀 Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Setup**:
    Create a `.env` file and add your database URL:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/delhibooks"
    ```

3.  **Generate Prisma Client**:
    ```bash
    npx prisma generate
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## ✨ Key Features

### 🛒 For Customers
- **Minimal Design**: Clean, Kindle-inspired UI focused on typography and books.
- **Physical & Digital**: Seamlessly switch between hardcover and PDF editions.
- **Library Vault**: Secure access to all purchased digital editions.
- **Smart Cart**: Persistent shopping experience with local storage.

### 🛠️ For Admins
- **ISBN Automation**: Add books in seconds by searching ISBN (Google Books API).
- **Logistics Center**: Manage shipping rules by country and state.
- **Inventory Dashboard**: Real-time sales statistics and recent activity timeline.
- **Taxonomy Console**: Full control over categories and store structure.

## 🛠 Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL with Prisma ORM
- **API**: Google Books API for metadata
- **Payments**: Razorpay & PayPal (Integration ready)
- **Auth**: NextAuth.js
