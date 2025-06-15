import {PlayerService} from '../service/PlayerService';

export class TogglePlayPause {
  private service: PlayerService;

  constructor(service: PlayerService) {
    this.service = service;
  }

  async execute(): Promise<void> {
    const status = await this.service.getStatus();

    if (status.isPlaying) {
      await this.service.pause();
    } else {
      await this.service.play();
    }
  }
}
