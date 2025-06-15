import {AppTheme} from '@/shared/theme';
import {useTheme} from '@/shared/theme/ThemeProvider';
import {Image, StyleSheet, Text, View} from 'react-native';
import {usePlayerStore} from '../store/playerStore';

export const NowPlayingInfo = () => {
  const {title, artist, album, artWorkUrl} = usePlayerStore();
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {artWorkUrl && (
        <Image
          source={require('@/../assets/images/vlc_artwork.png')}
          style={styles.artwork}
          onError={e => console.warn(e.nativeEvent.error)}
        />
      )}
      <Text style={styles.title}>{title || 'Falha na conexão'}</Text>
      {album ? <Text style={styles.album}>{album}</Text> : null}
      <Text style={styles.artist}>{artist || 'Verifique conexão com VLC'}</Text>
    </View>
  );
};

const createStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      padding: theme.spacing.md,
    },
    artwork: {
      width: 200,
      height: 200,
      borderRadius: theme.metrics.borderRadius,
      marginBottom: theme.spacing.md,
    },
    title: {
      textAlign: 'center',
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    artist: {
      color: theme.colors.primary,
      fontSize: 16,
      marginBottom: 4,
    },
    album: {
      color: theme.colors.muted,
      fontSize: 14,
    },
  });
};
