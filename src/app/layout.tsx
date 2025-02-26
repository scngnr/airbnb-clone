import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import ClientOnly from "@/components/ClientOnly";
import Modal from "@/components/modals/Modal";

const font = Nunito({
  subsets: ["latin"],
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
        <ClientOnly>
          <Modal isOpen={true} title="Login Modal"  />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
