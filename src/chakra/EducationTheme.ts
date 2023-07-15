import { extendTheme } from "@chakra-ui/react";
import { ContainerTheme } from "./Container";
import { ItemTheme } from "./Item";

import { ButtonTheme } from "./Button";
import { LinkTheme } from "./Link";
import { HeadingCustom } from "./Heading";
import { CardTheme } from "./Card";
import { MenuTheme } from "./Menu";
import { AccordionTheme } from "./Accordion";

const color = {
  blue: {
    100: "#066ac9",
  },
  grays: {
    100: "#fefefe",
    200: "#747579",
    300: "#eff1f2",
    400: "#a1a1a8",
    500: "#9a9ea4",
    800: "#24292d",
    900: "#2a2c31",
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
    200: "#222529",
    300: "#191b1d",
    400: "#0b0a12",
    500: "rgba(255, 255, 255, 0.07)",
  },
  primary: {
    100: "#8e85e6",
    200: "rgba(142, 133, 230, 0.1)",
    300: "rgba(255, 255, 255, 0.07)",
    400: "rgb(142 133 230 / 4%)",
    500: '#7a6deb'
  },
};

const typographyObj = {
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
};

const defaults = {
  styles: {
    global: {
      html: {
        fontSize: "16px",
      },
      "html, body": {
        minHeight: "69rem",
        color: "grays.400",
        maxWidth: "100%",
        overflowX: "hidden",
        backgroundColor: "darks.200", // Add the desired background color
        marginBottom: "3rem",
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
  Card: CardTheme,
  Menu: MenuTheme,
  Accordion: AccordionTheme,
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
