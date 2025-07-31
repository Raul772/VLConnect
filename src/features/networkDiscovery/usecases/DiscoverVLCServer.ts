import {IPDiscoveryService} from '../service/IPDiscoveryService';
import {IPStorageService} from '../service/IPStorageService';

export class DiscoverVLCServer {
  constructor(
    private discoveryService: IPDiscoveryService,
    private storageService: IPStorageService,
  ) {}

  async execute(): Promise<string | null> {
    const cached = await this.storageService.getCachedIP();

    if (cached && (await this.discoveryService.pingServer(cached))) {
      return cached;
    }

    const found = await this.discoveryService.scanNetwork();
    if (found) {
      await this.storageService.saveIP(found);
      return found;
    }

    return null;
  }
}
