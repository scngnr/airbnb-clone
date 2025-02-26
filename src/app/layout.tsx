import type { Metadata } from "next";
import {  Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

const font = Nunito({
  subsets:["latin"],
})


export const metadata: Metadata = {
  title: "Kiralama App Clone",
  description: "Tatili planla, dileğin gibi yaşa...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${font.className} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
