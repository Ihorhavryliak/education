"use client";
import { Container } from "@chakra-ui/react";
import { Roboto } from "next/font/google";
import { usePathname } from "next/navigation";
import React from "react";
import { Header } from "~/components/Header";
import { BackButton } from "~/components/Button";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
      <main className={roboto.className}>
        <Header />
        {/* {pathname !== "/courses" && <BackButton />} */}
        <Container mt='1rem'>{children}</Container>
      </main>
  );
}
