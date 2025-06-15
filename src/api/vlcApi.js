import axios from 'axios';
import {parseString} from 'react-native-xml2js';

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

const USE_XML = false;

export const getStatus = async setStatus => {
  try {
    const url = `${baseURL}/requests/status.${USE_XML ? 'xml' : 'json'}`;
    const response = await axios.get(url, {auth});

    if (USE_XML) {
      let parsedData;
      parseString(response.data, (err, result) => {
        if (err) {
          throw err;
        }
        // console.log('Dados XML analisados:', result);
        parsedData = result;
      });
      setStatus(parsedData.root);
    }

    // console.log('Dados JSON analisados:', response.data);
    setStatus(response.data);
  } catch (error) {
    console.error('Erro ao obter status do VLC:', error.message);
    return null;
  }
};

export const playPause = () => sendCommand('pl_pause');
export const next = () => sendCommand('pl_next');
export const previous = () => sendCommand('pl_previous');
