import { vlcSettingsController } from '@/features/settings/controller/vlcSettingsController';
import {
  useVlcSettingsStore,
  VlcSettings,
} from '@/features/settings/store/vlcSettingsStore';

export const useVlcSettings = () => {
  const settings = useVlcSettingsStore(state => state.settings); // ← Reativo

  const setSettings = async (newSettings: VlcSettings) => {
    await vlcSettingsController.setSettings(newSettings);
  };

  return {
    settings,
    setSettings,
  };
};
