export interface VLCStatusDto {
  state: 'playing' | 'paused' | 'stopped';
  volume: number;
  information?: any;
}
