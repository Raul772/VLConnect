import {StatusBar} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';

export default function ThemedStatusBar() {
  const {theme} = useTheme();

  const statusBarStyle =
    theme.mode === 'dark' ? 'light-content' : 'dark-content';

  return <StatusBar barStyle={statusBarStyle} />;
}
