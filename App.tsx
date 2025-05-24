import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import ThemedStatusBar from './src/components/StatusBar/ThemedStatusBar';
import {ThemeProvider} from './src/contexts/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';

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
