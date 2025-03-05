
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import Modal from "@/components/modals/Modal";
import Navbar from "@/components/Navbar/Navbar";
import ClientOnly from "@/components/ClientOnly";
import ToasterProvider from "../../pages/api/providers/ToasterProvider";
import RegisterModal from "@/components/modals/RegisterModal";

import i18n from "@/components/language/i18n";
import LoginModal from "@/components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";

const font = Nunito({
  subsets: ["latin"],
})


export const metadata: Metadata = {
  title: "Kiralama App Clone",
  description: "Tatili planla, dileğin gibi yaşa...",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentUser = await getCurrentUser();
  console.log(currentUser);
  return (
    <html lang="en">
      <body
        className={` ${font.className} antialiased`}
      >
          <ClientOnly>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <Navbar currentUser={currentUser} />
          </ClientOnly>
          {children}
      </body>
    </html>
  );
}
