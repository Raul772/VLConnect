import {AppTheme} from '@/shared/theme';
import {useTheme} from '@/shared/theme/ThemeProvider';
import {StyleSheet, Text, View} from 'react-native';
import {NowPlayingInfo} from '../components/NowPlayingInfo';
import {PlayerControls} from '../components/PlayerControls';
import {VolumeControl} from '../components/VolumeControl';

const PlayerScreen = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VLConnect</Text>
      <View style={styles.infoContainer}>
        <NowPlayingInfo />
        <PlayerControls />
        <VolumeControl />
      </View>
    </View>
  );
};

export default PlayerScreen;

const createStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    infoContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: theme.colors.muted,
    },
  });
};
