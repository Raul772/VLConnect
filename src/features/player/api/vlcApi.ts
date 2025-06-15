import {VLC_API_BASE_URL} from '@env';
import axios, {AxiosRequestConfig} from 'axios';
import {PlayerStatus} from '../models/PlayerStatus';

const BASE_URL = VLC_API_BASE_URL;

export interface VLCAPI {
  getStatus(auth: AxiosRequestConfig): Promise<PlayerStatus | undefined>;
  play(auth: AxiosRequestConfig): Promise<void>;
  pause(auth: AxiosRequestConfig): Promise<void>;
  nextTrack(auth: AxiosRequestConfig): Promise<void>;
  previousTrack(auth: AxiosRequestConfig): Promise<void>;
  setVolume(volume: number, auth: AxiosRequestConfig): Promise<void>;
}

export class vlcApi implements VLCAPI {
  async getStatus(
    apiRequestConfig: AxiosRequestConfig,
  ): Promise<PlayerStatus | undefined> {
    try {
      const response = await axios.get(
        `${BASE_URL}/requests/status.json`,
        apiRequestConfig,
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async play(apiRequestConfig: AxiosRequestConfig): Promise<void> {
    try {
      await axios.get(
        `${BASE_URL}/requests/status.json?command=pl_play`,
        apiRequestConfig,
      );
    } catch (error) {
      console.error('Error playing VLC:', error);
      throw new Error('Failed to play VLC');
    }
  }

  async pause(apiRequestConfig: AxiosRequestConfig): Promise<void> {
    try {
      await axios.get(
        `${BASE_URL}/requests/status.json?command=pl_pause`,
        apiRequestConfig,
      );
    } catch (error) {
      console.error('Error pausing VLC:', error);
      throw new Error('Failed to pause VLC');
    }
  }

  async nextTrack(apiRequestConfig: AxiosRequestConfig): Promise<void> {
    try {
      await axios.get(
        `${BASE_URL}/requests/status.json?command=pl_next`,
        apiRequestConfig,
      );
    } catch (error) {
      console.error('Error skipping to next track:', error);
      throw new Error('Failed to skip track');
    }
  }

  async previousTrack(apiRequestConfig: AxiosRequestConfig): Promise<void> {
    try {
      await axios.get(
        `${BASE_URL}/requests/status.json?command=pl_previous`,
        apiRequestConfig,
      );
    } catch (error) {
      console.error('Error returning to previous track:', error);
      throw new Error('Failed to return to previous track');
    }
  }

  async setVolume(
    volume: number,
    apiRequestConfig: AxiosRequestConfig,
  ): Promise<void> {
    try {
      await axios.get(
        `${BASE_URL}/requests/status.json?command=volume&val=${volume}`,
        apiRequestConfig,
      );
    } catch (error) {
      console.error('Error setting volume in VLC:', error);
      throw new Error('Failed to set volume in VLC');
    }
  }
}
