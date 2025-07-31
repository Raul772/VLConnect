import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'vlc_server_ip';

export class IPStorageService {
  async getCachedIP(): Promise<string | null> {
    return await AsyncStorage.getItem(KEY);
  }

  async saveIP(ip: string): Promise<void> {
    await AsyncStorage.setItem(KEY, ip);
  }
}
