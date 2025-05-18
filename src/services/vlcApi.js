import axios from 'axios';

let baseURL = 'http://192.168.3.11:8080';
let auth = {
  password: '9262',
};

const sendCommand = async command => {
  try {
    await axios.get(`${baseURL}/requests/status.json?command=${command}`, {
      auth,
    });
  } catch (error) {
    console.error(`Erro ao enviar comando "${command}":`, error.message);
    throw error;
  }
};

export const getStatus = async () => {
  try {
    const response = await axios.get(`${baseURL}/requests/status.json`, {auth});
    console.log('Status do VLC:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter status do VLC:', error.message);
    throw error;
  }
};

export const playPause = () => sendCommand('pl_pause');
export const next = () => sendCommand('pl_next');
export const previous = () => sendCommand('pl_previous');
