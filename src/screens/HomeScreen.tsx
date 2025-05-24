import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AlbumArtwork from '../components/AlbumArtwork/AlbumArtwork';
import Button from '../components/Button/Button';
import {useTheme} from '../contexts/ThemeContext';
import {getStatus, next, playPause, previous} from '../services/vlcApi';
import {ThemeType} from '../themes/themes';

export type StatusType = {
  fullscreen: number;
  seek_sec: number;
  apiversion: number;
  time: number;
  volume: number;
  length: number;
  random: boolean;
  rate: number;
  information: {
    category: {
      meta: {
        title: string;
        artist: string;
        album: string;
        genre: string;
        tracknumber: string;
        date: string;
        description: string;
        filename: string;
        artwork_url: string;
      };
    };
  };
  state:
    | 'stopped'
    | 'playing'
    | 'paused'
    | 'recording'
    | 'forward'
    | 'backward';
  loop: boolean;
  version: string;
  position: number;
  audiodelay: number;
  repeat: boolean;
};

export default function HomeScreen() {
  const {theme} = useTheme();

  const [imageUri, setImageUri] = useState<string>(
    'http://192.168.3.11:8080/art?t=' + Date.now(),
  );
  const [status, setStatus] = useState<StatusType | null>(null);
  const [loading, setLoading] = useState(true);

  async function handleNext() {
    await next();
    getStatus(setStatus);
    setImageUri('http://192.168.3.11:8080/art?t=' + Date.now());
  }
  async function handlePrevious() {
    await previous();
    getStatus(setStatus);
    setImageUri('http://192.168.3.11:8080/art?t=' + Date.now());
  }
  async function handlePlayPause() {
    await playPause();
    getStatus(setStatus);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getStatus(setStatus);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setImageUri('http://192.168.3.11:8080/art?t=' + Date.now());
  }, [status?.information.category.meta.artwork_url]);

  const styles = CreateStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VLConnect</Text>
      <View style={styles.infoContainer}>
        <>
          {status?.information.category.meta.artwork_url && (
            <AlbumArtwork imageUri={imageUri} />
          )}

          <Text style={styles.info}>
            {status?.information?.category?.meta?.title ||
              status?.information?.category?.meta?.filename ||
              'Desconhecido'}
          </Text>
          <Text style={styles.info}>
            ᯤ {status && (status.volume / 2.56).toFixed()}%
          </Text>

          <View style={styles.buttons}>
            <Button title="⏮" onPress={handlePrevious} />
            <Button title="⏯" onPress={handlePlayPause} />
            <Button title="⏭" onPress={handleNext} />
          </View>
        </>
      </View>
    </View>
  );
}

const CreateStyles = ({colors, globalStyles}: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: colors.background,
      width: '100%',
    },
    title: {
      fontFamily: globalStyles.fontFamily,
      color: colors.text,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    infoContainer: {
      flex: 1,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    info: {
      fontSize: 18,
      marginVertical: 5,
      color: colors.text,
      fontFamily: globalStyles.fontFamily,
    },
    buttons: {
      width: '60%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      gap: 10,
    },
  });
