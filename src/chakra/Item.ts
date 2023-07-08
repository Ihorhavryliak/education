import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { listAnatomy as parts } from "@chakra-ui/anatomy";

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle(() => ({
  // define the part you're going to style
  container: {},
  item: {
    //"text-transform": "none"
  },
  icon: {},
}));

export const ItemTheme = defineMultiStyleConfig({ baseStyle });
