
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar/Navbar";
import ClientOnly from "@/components/ClientOnly";
import ToasterProvider from "../../pages/api/providers/ToasterProvider";
import RegisterModal from "@/components/modals/RegisterModal";

import LoginModal from "@/components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "@/components/modals/RentModal";

import {  UserDataProvider } from "./_context/UserContext";

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

  return (
    <html lang="en">
      <body
        className={` ${font.className} antialiased`}
      >
        <ClientOnly>

          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <UserDataProvider currentUser={currentUser}>
          <div className="pb-20 pt-28">
            {children}
          </div>
        </UserDataProvider>
      </body>
    </html>
  );
}
