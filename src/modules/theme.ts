import { createTheme } from "@material-ui/core/styles"

const palette = {
  white1: "#FFFFFF",
  white2: "#FFF3E9",
  orange1: "#FFF3E9",
  orange2: "#FDA758",
  orange3: "#FC9D45",
  purple1: "#573353",
  purpleTransparent1: "rgba(87, 51, 83, 0.1)",
  purpleTransparent2: "rgba(87, 51, 83, 0.5)",
  purple1Transparent3: "rgba(87, 51, 83, 0.3)",
  purple2: "#C8C1C8",
  purple2Transparent2: "rgba(151, 52, 87, 0.2)",
  orangeTransparent1: "rgba(252, 157, 69, 0.2)",
  orange3Transparent2: "rgba(252, 157, 69, 0.1)",
  orange2Transparent1: "rgba(253, 168, 88, 0.1)",
  orange2Transparent2: "rgba(253, 168, 88, 0.2)",
  red1: "#fa0303",
  red2: "#F65B4E",
  red2Transparent2: "rgba(246, 92, 78, 0.2)",
  blue1Transparent2: "rgba(41, 49, 159, 0.2)",
  blackTransparent1: "rgba(4, 9, 32, 0.5)",
}

export const color = {
  ...palette,
  primary: palette.orange2,
}
export const spacing = {
  xxs: "1px",
  xs: "2px",
  s: "4px",
  m: "8px",
  l: "16px",
  lx: "24px",
  xl: "32px",
  xxl: "64px",
}

export const theme = createTheme({
  typography: {
    fontFamily: "Manrope",
    htmlFontSize: 10,
    h1: {
      fontFamily: "Klasik",
      fontSize: 32,
    },
    h2: {
      fontFamily: "Klasik",
      fontSize: 24,
    },
    h3: {
      fontSize: 18,
    },
    subtitle1: {
      fontSize: 14,
    },
    subtitle2: {
      fontSize: 10,
    },
    body1: {
      fontSize: 20,
    },
    body2: {
      fontSize: 12,
    },
    caption: {
      fontSize: 16,
    },
    button: {
      fontSize: 16,
    },
  },
  palette: {
    background: {
      default: color.orange1,
      paper: color.white1,
    },
    primary: {
      main: color.primary,
    },

    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
})
