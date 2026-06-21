# SpLnk - The Ultimate URL Shortener

![SpLnk](https://img.shields.io/badge/Status-Active-success) ![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)

SpLnk is a modern, fast, and beautifully designed URL shortener. It allows you to take full control of your links by creating custom, branded short links and generating downloadable QR codes instantly. Keep your campaigns fresh, effective, and deeply engaging.

## ✨ Features

- **Custom Short Links:** Create unlimited, personalized back-halves for your URLs.
- **Instant QR Codes:** Automatically generate a beautiful, branded QR code for every shortened link that you can download with a single click.
- **Live Preview:** See exactly what your short link will look like in real-time as you type.
- **Robust Security & Validation:** - Client-side validation using Zod and React Hook Form.
  - Server-side validation to ensure only valid HTTP/HTTPS URLs are processed.
  - SSRF protection by blocking internal IPs (e.g., localhost, 127.0.0.1).
  - Built-in client-side debounce (10-second cooldown) to prevent spam and API abuse.
- **Beautiful UI/UX:** A stunning, responsive design with custom scrollbars, smooth animations, and a dynamic gradient background.
- **Fast Redirects:** Built on Next.js App Router for blazing-fast performance.

---

## 🛠 Tech Stack & Dependencies

SpLnk is built using cutting-edge web technologies to ensure performance, type safety, and an excellent developer experience.

### Core
- **[Next.js](https://nextjs.org/) (16.2.9):** The React Framework for the Web, utilizing the modern App Router.
- **[React](https://react.dev/) (19.2.4):** Library for web and native user interfaces.
- **[TypeScript](https://www.typescriptlang.org/):** Strongly typed programming language that builds on JavaScript.

### Database
- **[MongoDB](https://www.mongodb.com/) (`mongodb`):** NoSQL database used to securely store and quickly retrieve the original URLs and their corresponding short names.

### Styling & UI Components
- **[Tailwind CSS v4](https://tailwindcss.com/):** A utility-first CSS framework for rapid UI development.
- **[shadcn/ui](https://ui.shadcn.com/):** Beautifully designed, accessible components that you can copy and paste into your apps.
  - Powered by **Radix UI** primitives.
  - Uses `class-variance-authority`, `clsx`, and `tailwind-merge` for robust class management.
- **[tw-animate-css](https://github.com/morteza-fsh/tw-animate-css):** Tailwind plugin for smooth CSS animations.

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/):** Performant, flexible, and extensible forms with easy-to-use validation.
- **[Zod](https://zod.dev/):** TypeScript-first schema declaration and validation library.
- **`@hookform/resolvers`:** Allows React Hook Form to use Zod for schema validation.

### Utilities & Enhancements
- **[qrcode](https://www.npmjs.com/package/qrcode):** Used to instantly generate downloadable QR codes for the shortened URLs.
- **[Sonner](https://sonner.emilkowal.ski/):** An opinionated toast component for React, providing beautiful and responsive notifications.
- **[Lucide React](https://lucide.dev/) & [Hugeicons](https://hugeicons.com/):** Clean and modern icon packs used throughout the application.
- **[Vercel Analytics](https://vercel.com/analytics):** (`@vercel/analytics`) Built-in tracking for page views and core web vitals.

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed and a [MongoDB](https://www.mongodb.com/) cluster ready.

### 1. Clone the repository
```bash
git clone [https://github.com/SwarnabhG07/splnk.git](https://github.com/SwarnabhG07/splnk.git)
cd splnk
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root of your project and add the following variables. Ensure there are no spaces around the `=` sign.

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.your-cluster.mongodb.net/
NEXT_PUBLIC_HOST=http://localhost:3000
```
*(Note: Replace `<username>`, `<password>`, and the cluster URL with your actual MongoDB connection string).*

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

- `app/page.tsx`: The main landing page containing the hero section and the URL shortening form.
- `app/api/generate/route.ts`: The backend API endpoint that validates the input and saves the URL to MongoDB.
- `app/[shorturl]/page.ts`: The dynamic route that catches the short URL, looks up the original URL in the database, and performs the redirect.
- `app/globals.css`: Global stylesheets including Tailwind configuration and custom scrollbar theming.
- `lib/mongodb.ts`: MongoDB client connection setup utilizing caching for serverless environments.
- `components/`: Contains reusable UI components built with shadcn/ui.