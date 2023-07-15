import { ArrowBackIcon } from "@chakra-ui/icons";
import Link from "next/link";
import React from "react";

export default function ArrowBack({ pathname }: { pathname: string }) {
  const url = pathname.slice(0, pathname.lastIndexOf("/"));
  return (
    <Link href={url ? url : '/'}>
      <ArrowBackIcon />
    </Link>
  );
}
