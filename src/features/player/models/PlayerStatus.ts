export type PlayerStatus = Partial<{
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
        artwork_url: string | undefined;
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
  isPlaying: boolean;
}>;


