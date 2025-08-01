import { useTheme } from '@/shared/theme/ThemeProvider';
import { StatusBar } from 'react-native';

export default function ThemedStatusBar() {
  const { mode } = useTheme();

  const statusBarStyle = mode === 'dark' ? 'light-content' : 'dark-content';

  return <StatusBar barStyle={statusBarStyle} />;
}
