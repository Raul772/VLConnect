import { VLCAPI } from '../api/vlcApi';
import { PlayerStatus } from '../models/PlayerStatus';

export class PlayerService {
  constructor(private api: VLCAPI) {}

  async getStatus(): Promise<PlayerStatus> {
    const dto = await this.api.getStatus();

    if (!dto || typeof dto !== 'object') {
      throw new Error('Invalid response from VLC API when fetching status');
    }

    return {
      isPlaying: dto.state === 'playing',
      ...dto,
    };
  }

  async togglePlayPause(): Promise<void> {
    const status = await this.getStatus();

    if (status.isPlaying) {
      await this.api.pause();
    } else {
      await this.api.play();
    }
  }

  async pause(): Promise<void> {
    await this.api.pause();
  }

  async nextTrack(): Promise<void> {
    await this.api.nextTrack();
  }

  async previousTrack(): Promise<void> {
    await this.api.previousTrack();
  }

  async setVolume(volume: number): Promise<void> {
    if (volume < 0 || volume > 512) {
      throw new Error('Volume must be between 0 and 512');
    }
    await this.api.setVolume(volume);
  }

  async getAlbumArtwork(){
    return await this.api.fetchArtworkAsBase64();
  }
}
