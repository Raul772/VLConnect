import { encodeToBase64 } from '@/shared/utils/toBase64';
import axios, { AxiosRequestConfig } from 'axios';
import RNFS from 'react-native-fs';
import { PlayerStatus } from '../models/PlayerStatus';

export interface VLCAPI {
  getStatus(auth?: AxiosRequestConfig): Promise<PlayerStatus | undefined>;
  fetchArtworkAsBase64(auth?: AxiosRequestConfig): Promise<string | undefined>;
  play(auth?: AxiosRequestConfig): Promise<void>;
  pause(auth?: AxiosRequestConfig): Promise<void>;
  nextTrack(auth?: AxiosRequestConfig): Promise<void>;
  previousTrack(auth?: AxiosRequestConfig): Promise<void>;
  setVolume(volume: number, auth?: AxiosRequestConfig): Promise<void>;
}

export type VLCServerSettings = {
  baseIP: string;
  password: string;
};

export class vlcApi implements VLCAPI {
  baseURL: string;
  baseIP: string;
  password: string;

  constructor({ baseIP, password }: VLCServerSettings) {
    this.baseURL = `http://${baseIP}:8080`;
    this.baseIP = baseIP;
    this.password = password;
  }
  async getStatus(
    apiRequestConfig?: AxiosRequestConfig,
  ): Promise<PlayerStatus | undefined> {
    const maxTries = 3;
    const retryDelay = 500;

    for (let i = 0; i < maxTries; i++) {
      try {
        const response = await axios.get(
          `${this.baseURL}/requests/status.json`,
          {
            ...apiRequestConfig,
            auth: {
              username: '',
              password: this.password,
            },
          },
        );

        return {
          ...response.data,
          information: {
            ...response.data.information,
            category: {
              ...response.data.information?.category,
              meta: {
                ...response.data.information?.category?.meta,
                artwork_url: `${this.baseURL}/art`,
              },
            },
          },
        };
      } catch (e) {
        console.error(`Tentativa ${i} falhou:`, e);
        if (i < maxTries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        } else {
          console.error('Todas as tentativas falharam.');
          throw e;
        }
      }
    }
  }

  async fetchArtworkAsBase64(): Promise<string | undefined> {
    const path = `${RNFS.CachesDirectoryPath}/vlc-artwork`;
    const url = `${this.baseURL}/art`;

    const maxTries = 3;
    const retryDelay = 500;

    for (let i = 0; i < maxTries; i++) {
      try {
        const result = await RNFS.downloadFile({
          fromUrl: url,
          toFile: path,
          headers: {
            Authorization: 'Basic ' + encodeToBase64(':' + this.password),
          },
        }).promise;

        if (result.statusCode !== 200) {
          throw new Error('Falha no download');
        } else {
          const base64 = await RNFS.readFile(path, 'base64');
          return `data:image/jpeg;base64,${base64}`;
        }
      } catch (e) {
        console.error(`Tentativa ${i} falhou:`, e);
        if (i < maxTries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        } else {
          console.error('Todas as tentativas falharam.');
          throw e;
        }
      }
    }
  }

  async play(apiRequestConfig?: AxiosRequestConfig): Promise<void> {
    try {
      await axios.get(`${this.baseURL}/requests/status.json?command=pl_play`, {
        ...apiRequestConfig,
        auth: {
          username: '',
          password: this.password,
        },
      });
    } catch (error) {
      console.error('Error playing VLC:', error);
      throw new Error('Failed to play VLC');
    }
  }

  async pause(apiRequestConfig?: AxiosRequestConfig): Promise<void> {
    try {
      await axios.get(`${this.baseURL}/requests/status.json?command=pl_pause`, {
        ...apiRequestConfig,
        auth: {
          username: '',
          password: this.password,
        },
      });
    } catch (error) {
      console.error('Error pausing VLC:', error);
      throw new Error('Failed to pause VLC');
    }
  }

  async nextTrack(apiRequestConfig?: AxiosRequestConfig): Promise<void> {
    try {
      await axios.get(`${this.baseURL}/requests/status.json?command=pl_next`, {
        ...apiRequestConfig,
        auth: {
          username: '',
          password: this.password,
        },
      });
    } catch (error) {
      console.error('Error skipping to next track:', error);
      throw new Error('Failed to skip track');
    }
  }

  async previousTrack(apiRequestConfig?: AxiosRequestConfig): Promise<void> {
    try {
      await axios.get(
        `${this.baseURL}/requests/status.json?command=pl_previous`,
        {
          ...apiRequestConfig,
          auth: {
            username: '',
            password: this.password,
          },
        },
      );
    } catch (error) {
      console.error('Error returning to previous track:', error);
      throw new Error('Failed to return to previous track');
    }
  }

  async setVolume(
    volume: number,
    apiRequestConfig?: AxiosRequestConfig,
  ): Promise<void> {
    try {
      await axios.get(
        `${this.baseURL}/requests/status.json?command=volume&val=${volume}`,
        {
          ...apiRequestConfig,
          auth: {
            username: '',
            password: this.password,
          },
        },
      );
    } catch (error) {
      console.error('Error setting volume in VLC:', error);
      throw new Error('Failed to set volume in VLC');
    }
  }
}
