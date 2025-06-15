import {PlayerService} from '../service/PlayerService';

export class PreviousTrack {
  private service: PlayerService;

  constructor(service: PlayerService) {
    this.service = service;
  }

  async execute(): Promise<void> {
    this.service.previousTrack();
  }
}
