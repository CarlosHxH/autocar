'use client';
import { createTheme } from '@mui/material/styles';
import getMPTheme from './theme/getMPTheme';
//#1a237e
export const customTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: true,
    dark: {
      palette: {
        primary: {
          main: '#3a6db0',
        },
        secondary: {
          main: '#3a6db0',
        },
        background: {
          default: '#2A4364',
          paper: '#112E4D',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const lightTheme = createTheme(getMPTheme('light'));
const darkTheme = createTheme(getMPTheme('dark'));

const theme = {
  light: lightTheme,
  dark: darkTheme,
};

export default theme;
