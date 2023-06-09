import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    backgroundColor: "darks.300",
    maxW: "368px",
  },
  header: {
    p: "2px",
  },
  body: {
    p: "0.5rem",
  },
  footer: {
    p: "2px",
  },
});

const sizes = {
  md: definePartsStyle({
    container: {
      borderRadius: "1rem",
    },
  }),
};

export const CardTheme = defineMultiStyleConfig({ baseStyle, sizes });
