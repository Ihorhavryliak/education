import { CheckCircleIcon } from "@chakra-ui/icons";
import React from "react";

export default function CompleteIcon({
  data, color = "primary.100", size = 7
}: {
  data: number | null | undefined;
  color?: string
  size?: number
}) {
  return (
    <CheckCircleIcon mr='0.8rem' boxSize={size} color={data ? color : "gray.100"} />
  );
}
