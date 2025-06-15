import {playerService, usecases} from '@/app/di';
import {usePlayerStore} from '../store/playerStore';

export const usePlayerController = () => {
  const {togglePlayPause, nextTrack, previousTrack, updateAlbumCover} =
    usecases;

  const setMeta = usePlayerStore(s => s.setMeta);
  const setVolume = usePlayerStore(s => s.setVolume);

  const handlePlayPause = async () => {
    try {
      await togglePlayPause.execute();
      scheduleStatusSync();
    } catch (e) {
      console.error('Error playing/pausing:', e);
    }
  };

  const handleNext = async () => {
    try {
      await nextTrack.execute();
      scheduleStatusSync();
    } catch (e) {
      console.error('Error skipping track:', e);
    }
  };

  const handlePrevious = async () => {
    try {
      await previousTrack.execute();
      scheduleStatusSync();
    } catch (e) {
      console.error('Erro backing track:', e);
    }
  };

  const getAlbumCover = async () => {
    return await updateAlbumCover();
  };

  const scheduleStatusSync = () => {
    setTimeout(() => {
      syncStatus();
    }, 1000);
  };

  const syncStatus = async () => {
    const data = await playerService.getStatus();
    const meta = data.information?.category?.meta;

    setMeta({
      title: meta?.title || meta?.filename || 'Desconhecido',
      artist: meta?.artist || 'Desconhecido',
      album: meta?.album || '',
      artWorkUrl: meta?.artwork_url || null,
    });

    setVolume(data.volume || 0);
  };

  return {
    handlePlayPause,
    handleNext,
    handlePrevious,
    syncStatus,
    getAlbumCover,
  };
};
