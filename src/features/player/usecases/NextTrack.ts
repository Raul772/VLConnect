import {PlayerService} from '../service/PlayerService';

export class NextTrack {
  private service: PlayerService;

  constructor(service: PlayerService) {
    this.service = service;
  }

  async execute(): Promise<void> {
    this.service.nextTrack();
  }
}
