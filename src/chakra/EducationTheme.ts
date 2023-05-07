import { extendTheme } from "@chakra-ui/react";
import { ContainerTheme } from "./Container";
import { ItemTheme } from "./Item";

import { ButtonTheme } from "./Button";
import { LinkTheme } from "./Link";
import { HeadingCustom } from "./Heading";

const color = {
  blue: {
    100: "#066ac9",
  },
  grays: {
    100: "#fefefe",
    200: "#747579",
    300: "#eff1f2",
    500: "#9a9ea4",
    800: "#24292d",
  },
  reds: {
    100: "#d6293e",
    200: "rgba(214, 41, 62, 0.1)",
  },
  greens: {
    100: "#0cbc87",
    200: "#0aa073",
  },
  darks: {
    100: "rgba(29, 58, 83, 0.15)",
  },
};

const typographyObj = {
  fonts: {
    body: "Roboto, sans-serif",
    heading: "Roboto, sans-serif",
  },
};

const defaults = {
  styles: {
    global: {
      html: {
        fontSize: "14px",
      },
      "html, body": {
        minHeight: "69rem",
        color: "grays.200",
        maxWidth: "100%",
        overflowX: "hidden",
        backgroundColor: "gray.700", // Add the desired background color
        marginBottom:'3rem',
      },
    },
  },
};
const componentsObj = {
  Container: ContainerTheme,
  List: ItemTheme,
  Link: LinkTheme,
  Button: ButtonTheme,
  Heading: HeadingCustom,
};

const colors = { ...color };
const sizes = {
  smOne: {},
};
const typography = { ...typographyObj };
const components = { ...componentsObj };

const EducationTheme = extendTheme({
  ...defaults,
  colors,
  sizes,
  ...typography,
  components,
});

export default EducationTheme;
