import localFont from "next/font/local";
import "./globals.css";
import { Outfit } from "next/font/google";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Slide Buddy",
  description: "Let's learn together 🚀✨",
};

const outfit = Outfit({ subsets: ["latin"]})

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
        <Provider>
          {children}
        </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
