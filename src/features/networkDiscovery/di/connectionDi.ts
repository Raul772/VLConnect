import {DiscoverVLCServer} from '../usecases/DiscoverVLCServer';
import {IPDiscoveryService} from '../service/IPDiscoveryService';
import {IPStorageService} from '../service/IPStorageService';

const ipDiscoveryService = new IPDiscoveryService();
const ipStorageService = new IPStorageService();

export const connectionUsecases = {
  discoverVLCServer: new DiscoverVLCServer(ipDiscoveryService, ipStorageService),
};
