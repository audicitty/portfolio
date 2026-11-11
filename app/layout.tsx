import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Divyanshu Bansal — Portfolio",
  description:
    "Divyanshu Bansal — Backend / Full Stack / AI Engineer. Portfolio of projects, experience and achievements.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-mono antialiased selection:bg-amber selection:text-black">
        {children}
      </body>
    </html>
  );
}
