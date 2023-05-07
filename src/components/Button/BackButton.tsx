"use client";
import { Button, Container } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackButton() {
  const router = useRouter();
  return(
  <Container>
    <Button onClick={() => router.back()}>Click here to go back</Button>
  </Container>
  )
}
