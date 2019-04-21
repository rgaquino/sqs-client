import axios from 'axios';
import log from 'electron-log';

import { GET_QUEUES } from './types';

// TODO: This shouldn't be hardcoded.
function getUrl(name) {
  return `http://127.0.0.1:9324/queue/${name}`;
}

export const getQueues = () => (dispatch) => {
  axios.get('http://localhost:5010/queues')
    .then((res) => {
      const queues = res.data.queues.map(q => q.substring(q.lastIndexOf('/') + 1));
      dispatch({
        type: GET_QUEUES,
        payload: queues,
      });
    })
    .catch((err) => {
      log.error(err);
      dispatch({
        type: GET_QUEUES,
        payload: {},
      });
    });
};

export const createQueue = (name, history) => () => {
  const payload = { name };
  axios.post('http://localhost:5010/queue', payload)
    .then(() => {
      getQueues();
      history.push('/');
    })
    .catch(err => log.error(err));
};

export const deleteQueue = (name, history) => () => {
  const payload = { queue: getUrl(name) };
  axios.delete('http://localhost:5010/queue', { data: payload })
    .then(() => {
      getQueues();
      history.push('/');
    })
    .catch(err => log.error(err));
};
