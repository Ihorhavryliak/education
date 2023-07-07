import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const brandPrimary = defineStyle({
  textDecoration: "none",
  _hover: {
    color: "textColor.200",
    textDecoration: "none",
  },
});

const brandClear = defineStyle({
  _hover: {
    textDecoration: "none",
  },
});

const clearHome = defineStyle({
  textTransform: "uppercase",
  color: "black.100",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "0.12px",
  fontFamily: "Poppins-700",
  _hover: {
    textDecoration: "none",
  },
});
const button = defineStyle({
  letterSpacing: '0.5px',
  lineHeight: '1.5',
  fontSize: '1rem',
  fontWeight: "500",
  borderRadius:'0.5rem',
  bg: 'primary.200',
  border: '0',
  px:'1rem',
  py:'0.5rem',
  color: 'primary.100',
  _focus: {
  },
  _hover: {
    color: "white",
    bg: "primary.100",
    textDecor: 'none'
  },
});

const buttonLink = defineStyle({
  letterSpacing: '0.5px',
  lineHeight: '1.5',
  fontSize: '1rem',
  fontWeight: "500",
  borderRadius:'0.5rem',

  border: '0',
  py:'0.5rem',
  color: 'primary.100',
  _focus: {
  },
  _hover: {
    color: "white.200",
    textDecor: 'none'
  },
});
export const LinkTheme = defineStyleConfig({
  variants: { brandPrimary, brandClear, clearHome, button, buttonLink },
  defaultProps: {
    variant: "brandPrimary",
    colorScheme: "brand",
  },
});
