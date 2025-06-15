import {PlayerService} from '../service/PlayerService';

export class SetVolume {
  private service: PlayerService;

  constructor(service: PlayerService) {
    this.service = service;
  }

  async execute(value: number): Promise<void> {
    this.service.setVolume(value);
  }
}
