import {create} from 'zustand';
import {PlayerStatus} from '../models/PlayerStatus';

interface PlayerState extends Partial<PlayerStatus> {
  title: string;
  artist: string;
  album: string;
  artWorkUrl: string | null;
  volume: number;

  setMeta: (meta: {
    title: string;
    artist: string;
    album: string;
    artWorkUrl: string | null;
  }) => void;
  setVolume: (volume: number) => void;
}

export const usePlayerStore = create<PlayerState>(set => ({
  title: '',
  artist: '',
  album: '',
  artWorkUrl: null,
  volume: 0,

  setMeta: ({title, artist, album, artWorkUrl}) =>
    set({title, artist, album, artWorkUrl}),

  setVolume: volume => set({volume}),
}));
