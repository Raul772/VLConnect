import { vlcApi, VLCServerSettings } from '@/features/player/api/vlcApi';
import { PlayerService } from '@/features/player/service/PlayerService';

export const createPlayerDependencies = (settings: VLCServerSettings) => {
  const api = new vlcApi(settings);
  const playerService = new PlayerService(api);

  return {
    service: playerService,
  };
};
