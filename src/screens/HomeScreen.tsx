import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getStatus, next, playPause, previous} from '../services/vlcApi';

type Status = {
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
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStatus = async () => {
    try {
      setLoading(true);
      const data = await getStatus();
      setStatus(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao VLC.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VLConnect</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text style={styles.info}>
            Tocando:{' '}
            {status?.information?.category?.meta?.title ||
              status?.information?.category?.meta?.filename ||
              'Desconhecido'}
          </Text>
          <Text style={styles.info}>
            Volume: {status && status.volume / 2.56}%
          </Text>

          <View style={styles.buttons}>
            <Button
              title="⏮ Anterior"
              onPress={async () => {
                await previous();
                loadStatus();
              }}
            />
            <Button
              title={status?.state === 'playing' ? '⏸ Pausar' : '▶️ Reproduzir'}
              onPress={async () => {
                await playPause();
                loadStatus();
              }}
            />
            <Button
              title="⏭ Próximo"
              onPress={async () => {
                await next();
                loadStatus();
              }}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {color: 'white', fontSize: 28, fontWeight: 'bold', marginBottom: 20},
  info: {fontSize: 18, marginVertical: 5},
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
});
