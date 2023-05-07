import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const menu1 = defineStyle({
  fontSize: "13px",
  fontFamily: "Poppins-700",
  letterSpacing: "0.13px",
  padding: "21px 29px",
  backgroundColor: "black.100",
  borderColor: "black.100 black.100  black.600",
  color: "white",
  textTransform: "uppercase",
  borderRadius: "0",
  transition:
    "color 0.15s,background-color 0.15s,border-color 0.15s,box-shadow 0.15s,transform 0.2s",
  lineHeight: "1.42857",
  _hover: {
    borderColor: "black.200 black.200  black.100",
    bg: "black.700",
  },
});

const menu = defineStyle({
  fontSize: "13px",
  fontWeight: "500",
  lineHeight: "40px",
  bg: 'none',
  border: '0',
  px:'1rem',
  color: 'grays.200',
  _focus: {
    bg: 'none',
     border: '0',
  },
  _hover: {
    color: "blue.100",
  },
});

export const ButtonTheme = defineStyleConfig({
  variants: { menu },
});
