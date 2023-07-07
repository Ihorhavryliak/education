import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export default function ArrowBack() {
  const router = useRouter();
  return (
    <Box as="span" cursor={"pointer"} onClick={() => router.back()}>
      <ArrowBackIcon />
    </Box>
  );
}
