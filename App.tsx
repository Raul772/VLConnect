import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemedStatusBar from './src/shared/components/StatusBar/ThemedStatusBar';
import { RootNavigation } from './src/shared/navigation/index';
import { ThemeProvider } from './src/shared/theme/ThemeProvider';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <ThemedStatusBar />
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;
