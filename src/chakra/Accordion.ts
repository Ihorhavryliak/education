import { accordionAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    border: "0",
    marginTop: "1px",
  },
  button:{
    bg: 'primary.200',
    _hover: {
      bg: 'primary.100',
      color: 'white'
    }
  },
  panel:{
    borderBottom: '1px solid',
    borderColor: 'primary.200',
    pb: '2rem'
  }

});

export const AccordionTheme = defineMultiStyleConfig({ baseStyle });
