import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {darkTheme, lightTheme, ThemeType} from '../themes/themes';

type ThemeModeType = 'light' | 'dark' | 'system';

interface ThemeContextProps {
  theme: ThemeType;
  mode: ThemeModeType;
  setMode: (mode: ThemeModeType) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeModeType>('system');

  const [theme, setTheme] = useState<ThemeType>(
    systemColorScheme === 'dark' ? darkTheme : lightTheme,
  );

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('theme_mode');
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setMode(stored);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('theme_mode', mode);

    const resolvedTheme = () => {
      if (mode === 'system' && systemColorScheme === 'dark') {return darkTheme;}
      if (mode === 'dark') {return darkTheme;}
      return lightTheme;
    };

    setTheme(resolvedTheme());
  }, [mode, systemColorScheme]);

  return (
    <ThemeContext.Provider value={{theme, mode, setMode}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado em um ThemeProvider');
  }
  return context;
};
