import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

export const HeadingCustom = {
  baseStyle: {
    fontSize: '2.34375rem',
    color: "white",
    fontFamily:  "Heebo, sans-serif",
    fontWeight: '700',
    lineHeight: 1.25,
    // let's also provide dark mode alternatives
    _dark: {},
  },
};
