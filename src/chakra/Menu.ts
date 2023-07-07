import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  button: {
    _hover: { color: "primary.100" },
  },
  list: {
    // this will style the MenuList component
    border: "1px solid",
    borderColor: "darks.500",
    py: "0",
    mt: "-6px",
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    fontFamily: "SF Pro Text",
    fontWeight: "400",
    fontSize: "16px",

    color: "coolGrey.800",
    borderRadius: "0.375rem",
    bg: "darks.300",
    p: "0.4rem",
    _hover: {
      bg: "darks.300",
      color: "primary.100" 
    },
    _focus: {
      bg: "darks.300",
    },
  },
  groupTitle: {
    // this will style the text defined by the title prop
    // in the MenuGroup and MenuOptionGroup components
    textTransform: "uppercase",
    color: "white",
    textAlign: "center",
    letterSpacing: "wider",
    opacity: "0.7",
  },
  command: {
    // this will style the text defined by the command
    // prop in the MenuItem and MenuItemOption components
    color: "coolGrey.800",
  },
  divider: {
    // this will style the MenuDivider component
    p: "0",
    m: "0",
    color: "rgba(0, 0, 0, 0.2)",
    /* Elevation/component */
    /* boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.12), 0px 4px 8px rgba(0, 0, 0, 0.12)', */
    borderRadius: "0.375rem",
  },
});
// export the base styles in the component theme
export const MenuTheme = defineMultiStyleConfig({ baseStyle });
