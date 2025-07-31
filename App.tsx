import React from 'react';
// import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ThemedStatusBar from './src/shared/components/StatusBar/ThemedStatusBar';
import {RootNavigation} from './src/shared/navigation/index';
import {ThemeProvider} from './src/shared/theme/ThemeProvider';

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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
