import { useVlcSettingsStore } from '@/features/settings/store/vlcSettingsStore';

export const useVlcSettings = () => {
  const settings = useVlcSettingsStore(state => state.settings); // ← Reativo

  return {
    settings,
    setSettings: useVlcSettingsStore(state => state.setSettings),
  };
};
