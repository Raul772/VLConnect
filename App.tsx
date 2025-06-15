import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import HomeScreen from './src/features/player/screens/HomeScreen';
import ThemedStatusBar from './src/features/settings/components/StatusBar/ThemedStatusBar';
import {ThemeProvider} from './src/shared/theme/ThemeProvider';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <ThemedStatusBar />
        <SafeAreaView style={styles.container}>
          <HomeScreen />
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
