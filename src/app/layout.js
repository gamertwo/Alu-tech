import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "./ClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "White Gold Aluminum",
  description: "Premium aluminum solutions for industrial and commercial needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add a script to define self before any client code runs */}
        <script dangerouslySetInnerHTML={{
          __html: `
            if (typeof self === 'undefined' && typeof window !== 'undefined') {
              window.self = window;
            }
          `
        }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}