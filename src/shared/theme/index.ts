import { lightColors } from './light';
import { darkColors } from './dark';
import { typography } from './typography';
import { spacing } from './spacing';
import { metrics } from './metrics';

export const lightTheme = {
  colors: lightColors,
  typography,
  spacing,
  metrics,
};

export const darkTheme = {
  colors: darkColors,
  typography,
  spacing,
  metrics,
};

export type AppTheme = typeof lightTheme;
