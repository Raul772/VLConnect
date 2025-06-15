import {AppTheme} from '@/shared/theme';
import {useTheme} from '@/shared/theme/ThemeProvider';
import Slider from '@react-native-community/slider';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {usePlayerController} from '../controller/usePlayerController';
import {usePlayerStore} from '../store/playerStore';

export const VolumeControl = () => {
  const {theme} = useTheme();
  const volume = usePlayerStore(s => s.volume);
  const [localVolume, setLocalVolume] = useState<number>(volume ?? 0);

  const isLoud = localVolume > 100;

  const {handleVolumeChange} = usePlayerController();
  const styles = createStyles(theme, isLoud);

  useEffect(() => {
    setLocalVolume(volume);
  }, [volume]);


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Volume:</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={125}
        step={1}
        value={localVolume}
        onValueChange={e => {
          setLocalVolume(e);
          handleVolumeChange(e);
        }}
        minimumTrackTintColor={
          isLoud ? theme.colors.danger : theme.colors.primary
        }
        maximumTrackTintColor={theme.colors.muted}
        thumbTintColor={isLoud ? theme.colors.danger : theme.colors.primary}
      />
      <Text style={styles.value}>{localVolume}%</Text>
    </View>
  );
};

const createStyles = (theme: AppTheme, isLoud: boolean) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      paddingHorizontal: 16,
    },
    label: {
      color: theme.colors.text,
    },
    value: {
      color: isLoud ? theme.colors.danger : theme.colors.text,
    },
    slider: {
      width: 100,
      height: 40,
    },
  });
