import axios from 'axios';
import log from 'electron-log';

import { GET_QUEUES } from './types';

export const getQueues = () => (dispatch) => {
  axios.get('http://localhost:5010/queues')
    .then((res) => {
      dispatch({
        type: GET_QUEUES,
        payload: res.data.queues,
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

export const createQueue = (queue, history) => () => {
  axios.post('http://localhost:5010/queue', queue)
    .then(() => {
      getQueues();
      history.push('/');
    })
    .catch(err => log.error(err));
};
