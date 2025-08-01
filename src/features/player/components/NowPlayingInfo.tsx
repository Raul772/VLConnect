import { AppTheme } from '@/shared/theme';
import { useTheme } from '@/shared/theme/ThemeProvider';
import FastImage from '@d11/react-native-fast-image';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { usePlayerController } from '../controller/usePlayerController';
import { usePlayerStore } from '../store/playerStore';

export const NowPlayingInfo = () => {
  const { title, artist, album, artWorkUrl } = usePlayerStore();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  console.log('renderizou');

  const {
    current: { getAlbumArtwork },
  } = useRef(usePlayerController());
  const [artWorkExternal, setArtWorkExternal] = useState<string>('');

  useEffect(() => {
    // async function loadArtWork() {
    //   setArtWorkExternal(await getAlbumCover(artist, album));
    // }
    // loadArtWork();

    getAlbumArtwork().then((r = '') => {
      setArtWorkExternal(r);
    });
  }, [artist, album, getAlbumArtwork]);

  return (
    <View style={styles.container}>
      {artWorkUrl && artWorkExternal ? (
        <FastImage
          key={artWorkExternal || artWorkUrl}
          source={{
            uri: artWorkExternal,
            priority: 'high',
            cache: 'web',
          }}
          style={styles.artwork}
        />
      ) : (
        <FastImage
          key={artWorkExternal || artWorkUrl}
          source={require('@/../assets/images/vlc_artwork.png')}
          style={styles.artwork}
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
