import {VLC_API_PASSWORD} from '@env';
import {VLCAPI} from '../api/vlcApi';
import {PlayerStatus} from '../models/PlayerStatus';

export class PlayerService {
  constructor(private api: VLCAPI) {}

  async getStatus(): Promise<PlayerStatus> {
    const dto = await this.api.getStatus(this.getApiAuth());

    if (!dto || typeof dto !== 'object') {
      throw new Error('Invalid response from VLC API when fetching status');
    }

    return {
      isPlaying: dto.state === 'playing',
      ...dto,
    };
  }

  async play(): Promise<void> {
    await this.api.play(this.getApiAuth());
  }

  async pause(): Promise<void> {
    await this.api.pause(this.getApiAuth());
  }

  async nextTrack(): Promise<void> {
    await this.api.nextTrack(this.getApiAuth());
  }

  async previousTrack(): Promise<void> {
    await this.api.previousTrack(this.getApiAuth());
  }

  async setVolume(volume: number): Promise<void> {
    if (volume < 0 || volume > 512) {
      throw new Error('Volume must be between 0 and 512');
    }
    await this.api.setVolume(volume, this.getApiAuth());
  }

  private getApiAuth() {
    return {
      auth: {
        username: '',
        password: VLC_API_PASSWORD,
      },
    };
  }
}
