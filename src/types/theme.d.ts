// types/theme.d.ts
import { Theme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface AutoPartsThemeOptions extends ThemeOptions {
    customColors?: {
      promotion?: string;
      newItem?: string;
      outOfStock?: string;
    }
  }

  interface AutoPartsTheme extends Theme {
    customColors: {
      promotion: string;
      newItem: string;
      outOfStock: string;
    }
  }
}