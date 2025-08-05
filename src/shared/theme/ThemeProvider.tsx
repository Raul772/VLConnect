import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Appearance } from 'react-native';
import { AppTheme, darkTheme, lightTheme } from './index';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: AppTheme;
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  mode: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = Appearance.getColorScheme();

  const [mode, setMode] = useState<ThemeMode>(colorScheme ?? 'light');

  const toggleTheme = () =>
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));

  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
