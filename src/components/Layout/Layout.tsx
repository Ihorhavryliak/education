"use client";
import { Container } from "@chakra-ui/react";
/* import { Roboto } from "next/font/google"; */
import React from "react";
import { Header } from "~/components/Header";
import ScrollTop from "../ScrollTop/ScrollTop";

/* const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
}); */

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main /* className={roboto.className} */>
        <Header />
        <Container mt="1rem">{children}</Container>
      </main>
      <ScrollTop />
    </>
  );
}
