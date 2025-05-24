import globalStyles from '../styles/globalStyles';

export const lightTheme = {
  mode: 'light',
  colors: {
    primary: '#FFA500', // Laranja (cor principal do VLC)
    secondary: '#FFFFFF', // Fundo claro
    accent: '#333333', // Destaques escuros
    text: '#111111', // Texto escuro
    background: '#F9F9F9', // Fundo de tela
    error: '#D32F2F', // Vermelho suave
    warning: '#ED6C02', // Laranja escuro
    success: '#2E7D32', // Verde suave
    info: '#0288D1', // Azul claro
  },
  globalStyles,
};
export const darkTheme = {
  mode: 'dark',
  colors: {
    primary: '#FFA500', // Laranja (continua como cor primária)
    secondary: '#1C1C1C', // Cinza bem escuro para superfícies
    accent: '#FFCC80', // Laranja claro para realces
    text: '#FFFFFF', // Texto branco
    background: '#121212', // Fundo escuro
    error: '#EF5350', // Vermelho mais vibrante
    warning: '#FFB74D', // Laranja médio
    success: '#81C784', // Verde claro
    info: '#4FC3F7', // Azul leve
  },
  globalStyles,
};

export type ThemeType = typeof lightTheme;
