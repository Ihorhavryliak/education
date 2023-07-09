import { defineStyle, defineStyleConfig } from "@chakra-ui/react";



const menu = defineStyle({
  fontSize: "13px",
  fontWeight: "500",
  lineHeight: "40px",
  bg: "none",
  border: "0",
  px: "1rem",
  color: "grays.200",
  _focus: {
    bg: "none",
    border: "0",
  },
  _hover: {
    color: "blue.100",
  },
});

const main = defineStyle({
  letterSpacing: "0.5px",
  lineHeight: "1.5",
  fontSize: "1rem",
  fontWeight: "500",
  borderRadius: "0.5rem",
  bg: "primary.200",
  border: "0",
  px: "1rem",
  py: "0.5rem",
  color: "primary.100",
  _focus: {},
  _hover: {
    color: "white",
    bg: "primary.100 !important",
  },
  _disabled: {
    color: "white",
    bg: "primary.200",
  },
});

const load = defineStyle({
  letterSpacing: "0.5px",
  lineHeight: "1.5",
  fontSize: "1rem",
  fontWeight: "500",
  borderRadius: "0.5rem",
  bg: "primary.200",
  border: "0",
  px: "1rem",
  py: "0.5rem",
  color: "primary.100",
  _focus: {},
  _hover: {
    color: "white",
    bg: "primary.100 ",
  },
  _disabled: {
    cursor: 'pointer',
    opacity: 1,
    color: "primary.100 !important",
    bg: "primary.200 !important" ,
  },
});

export const ButtonTheme = defineStyleConfig({
  variants: { menu, main, load },
});
