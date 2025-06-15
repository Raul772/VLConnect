import {playerService, usecases} from '@/app/di';
import throttle from 'lodash/throttle';
import {useCallback, useMemo} from 'react';
import {usePlayerStore} from '../store/playerStore';

export const usePlayerController = () => {
  const {togglePlayPause, nextTrack, previousTrack, SetVolume} = usecases;

  const setMeta = usePlayerStore(s => s.setMeta);
  const setVolume = usePlayerStore(s => s.setVolume);

  const handlePlayPause = async () => {
    try {
      await togglePlayPause.execute();
    } catch (e) {
      console.error('Error playing/pausing:', e);
    } finally {
      scheduleSyncStatus();
    }
  };

  const handleNext = async () => {
    try {
      await nextTrack.execute();
    } catch (e) {
      console.error('Error skipping track:', e);
    } finally {
      scheduleSyncStatus();
    }
  };

  const handlePrevious = async () => {
    try {
      await previousTrack.execute();
    } catch (e) {
      console.error('Erro backing track:', e);
    } finally {
      scheduleSyncStatus();
    }
  };

  const syncStatus = useCallback(async () => {
    const data = await playerService.getStatus();
    const meta = data.information?.category?.meta;
    const volume = data.volume;

    setMeta({
      title: meta?.title || meta?.filename || 'Desconhecido',
      artist: meta?.artist || 'Desconhecido',
      album: meta?.album || '',
      artWorkUrl: meta?.artwork_url || null,
    });

    setVolume((volume && Math.ceil(volume / 2.56)) || 0);
  }, [setMeta, setVolume]);


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
          await SetVolume.execute(VLCVolumeValue);
        } catch (e) {
          console.error('Error setting volume:', e);
        }
      }, 500),
    [SetVolume],
  );

  return {
    handlePlayPause,
    handleNext,
    handlePrevious,
    handleVolumeChange,
    syncStatus,
  };
};
