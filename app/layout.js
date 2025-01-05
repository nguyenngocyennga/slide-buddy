// ------------------------ Root Layout ----------------------------------------
// This file defines the root layout for the application, providing global styles, 
// font configurations, and core providers like Clerk and application context.

import localFont from "next/font/local"; 
import "./globals.css";
import { Geologica } from "next/font/google";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

// ------------------------ Metadata Configuration -----------------------------
// Metadata for the application, used for SEO and browser tab display.
export const metadata = {
  title: "Slide Buddy",
  description: "Let's learn together 🚀✨",
};

// ------------------------ Font Configuration ---------------------------------
// Geologica font imported with Latin subset for consistent typography across the app.
const geologica = Geologica({ subsets: ["latin"]})

// ------------------------ Root Layout Component -----------------------------
// Provides the foundational structure and global context for the app.
export default function RootLayout({ children }) {
  return (
    // ClerkProvider wraps the app to provide authentication and user session management
    <ClerkProvider>
      <html lang="en">
        <body className={geologica.className}>
        <Provider>
          {children}
        </Provider>
        <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
