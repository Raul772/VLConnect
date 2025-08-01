import { createPlayerDependencies } from '@/app/di';
import { useVlcSettings } from '@/features/settings/hooks/useVLCSettings';
import throttle from 'lodash/throttle';
import { useCallback, useMemo } from 'react';
import { usePlayerStore } from '../store/playerStore';

export const usePlayerController = () => {
  const { settings } = useVlcSettings();
  const { service } = createPlayerDependencies({
    baseIP: settings.ip,
    password: settings.password,
  });
  const setMeta = usePlayerStore(s => s.setMeta);
  const setVolume = usePlayerStore(s => s.setVolume);

  const getAlbumArtwork = useCallback(async () => {
    try {
      return await service.getAlbumArtwork();
    } catch (e) {
      console.error('Error getting album artwork:', e);
    }
  }, [service]);

  const handlePlayPause = async () => {
    try {
      await service.togglePlayPause();
    } catch (e) {
      console.error('Error playing/pausing:', e);
    } finally {
      scheduleSyncStatus();
    }
  };

  const handleNext = async () => {
    try {
      await service.nextTrack();
    } catch (e) {
      console.error('Error skipping track:', e);
    } finally {
      scheduleSyncStatus();
    }
  };

  const handlePrevious = async () => {
    try {
      await service.previousTrack();
    } catch (e) {
      console.error('Erro backing track:', e);
    } finally {
      scheduleSyncStatus();
    }
  };

  const syncStatus = useCallback(async () => {
    const data = await service.getStatus();
    const meta = data.information?.category?.meta;
    const volume = data.volume;

    setMeta({
      title: meta?.title || meta?.filename || 'Desconhecido',
      artist: meta?.artist || 'Desconhecido',
      album: meta?.album || '',
      artWorkUrl: meta?.artwork_url || '',
    });

    setVolume((volume && Math.ceil(volume / 2.56)) || 0);
  }, [setMeta, setVolume, service]);

  const scheduleSyncStatus = useCallback(() => {
    setTimeout(() => {
      syncStatus();
    }, 300);
  }, [syncStatus]);

  const handleVolumeChange = useMemo(
    () =>
      throttle(async (vol: number) => {
        const VLCVolumeValue = vol * 2.56;

        try {
          await service.setVolume(VLCVolumeValue);
        } catch (e) {
          console.error('Error setting volume:', e);
        }
      }, 500),
    [service],
  );

  return {
    getAlbumArtwork,
    handlePlayPause,
    handleNext,
    handlePrevious,
    handleVolumeChange,
    syncStatus,
  };
};
