import axios from 'axios';
import log from 'electron-log';
import { GET_QUEUES } from './types';

// TODO: This shouldn't be hardcoded.
function getUrl(name) {
  return `http://127.0.0.1:9324/queue/${name}`;
}

export const sendMessage = (queue, message) => (dispatch) => {
  const payload = {
    queue: getUrl(queue),
    message,
  };

  axios.post('http://localhost:5010/message', payload)
    .then(() => {
      log.info('Message sent to queue');
    })
    .catch((err) => {
      log.error(err);
      dispatch({
        type: GET_QUEUES,
        payload: {},
      });
    });
};
