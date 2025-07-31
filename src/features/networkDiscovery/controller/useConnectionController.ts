import {connectionUsecases} from '../di/connectionDi';
import {useConnectionStore} from '../store/connectionStore';

export const useConnectionController = () => {
  const {discoverVLCServer} = connectionUsecases;

  const setIp = useConnectionStore(s => s.setIp);
  const setStatus = useConnectionStore(s => s.setStatus);

  const discover = async () => {
    setStatus('searching');

    const ip = await discoverVLCServer.execute();

    if (ip) {
      setIp(ip);
      setStatus('found');
    } else {
      setStatus('not_found');
    }
  };

  return {discover};
};
