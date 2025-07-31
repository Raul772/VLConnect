import {create} from 'zustand';

type ConnectionStatus = 'idle' | 'searching' | 'found' | 'not_found';

interface State {
  ip: string | null;
  status: ConnectionStatus;
  setIp: (ip: string | null) => void;
  setStatus: (status: ConnectionStatus) => void;
}

export const useConnectionStore = create<State>(set => ({
  ip: null,
  status: 'idle',
  setIp: ip => set({ip}),
  setStatus: status => set({status}),
}));
