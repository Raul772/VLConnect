import {AppTheme} from '@/shared/theme';
import {useTheme} from '@/shared/theme/ThemeProvider';
import {useEffect} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {usePlayerController} from '../controller/usePlayerController';

export const PlayerControls = () => {
  const {handlePlayPause, handleNext, handlePrevious, syncStatus} =
    usePlayerController();
  const {theme} = useTheme();
  const styles = createStyles(theme);

  useEffect(() => {
    syncStatus();
  }, [syncStatus]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handlePrevious}>
        <Text style={styles.buttonText}>⏮</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handlePlayPause}>
        <Text style={styles.buttonText}>⏯</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>⏭</Text>
      </Pressable>
    </View>
  );
};

const createStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      gap: '20',
      marginBottom: 12,
    },
    button: {
      backgroundColor: theme.colors.primary,
      width: 50,
      height: 50,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: theme.typography.heading.fontWeight,
    },
  });
};
