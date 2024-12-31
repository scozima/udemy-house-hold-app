import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Palette {
    incomeColor: PaletteColor;
    expanceColor: PaletteColor;
    balanceColor: PaletteColor;
  }

  interface PaletteOptions {
    incomeColor: PaletteColorOptions;
    expanceColor: PaletteColorOptions;
    balanceColor: PaletteColorOptions;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: ["Noto Sans JP", "sans-serif"].join(","),
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },

  palette: {
    // 収入用の色
    incomeColor: {
      main: blue[500],
      light: blue[100],
      dark: blue[700],
    },

    // 支出用の色
    expanceColor: {
      main: red[500],
      light: red[100],
      dark: red[700],
    },

    balanceColor: {
      main: green[500],
      light: green[100],
      dark: green[700],
    },
  },
});

export default theme;
