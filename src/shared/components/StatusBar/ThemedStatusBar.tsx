import { useTheme } from '@/shared/theme/ThemeProvider';
import { StatusBar } from 'react-native';

export default function ThemedStatusBar() {
  const { mode } = useTheme();

  const statusBarStyle = mode === 'dark' ? 'light-content' : 'dark-content';
  console.log(statusBarStyle);

  return <StatusBar barStyle={statusBarStyle} />;
}
