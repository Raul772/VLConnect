import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

export interface VlcSettings {
  ip: string;
  password: string;
}

interface VlcSettingsState {
  settings: VlcSettings;
  setSettings: (newsettings: VlcSettings) => void;
}

export const VLC_SETTINGS_KEY = 'vlc_settings';

export const useVlcSettingsStore = create<VlcSettingsState>()(
  persist(
    set => ({
      settings: {ip: '', password: ''},
      setSettings: (settings: VlcSettings) => set({settings}),
    }),
    {
      name: VLC_SETTINGS_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
