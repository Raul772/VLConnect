import {vlcApi} from '@/features/player/api/vlcApi';
import {PlayerService} from '@/features/player/service/PlayerService';
import {NextTrack} from '@/features/player/usecases/NextTrack';
import {PreviousTrack} from '@/features/player/usecases/PreviousTrack';
import {TogglePlayPause} from '@/features/player/usecases/TogglePlayPause';

const api = new vlcApi();
const playerService = new PlayerService(api);

export const usecases = {
  togglePlayPause: new TogglePlayPause(playerService),
  nextTrack: new NextTrack(playerService),
  previousTrack: new PreviousTrack(playerService),
};

export {playerService};
