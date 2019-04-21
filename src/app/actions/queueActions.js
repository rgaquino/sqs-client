import axios from 'axios';
import log from 'electron-log';

import { GET_QUEUES, DELETE_QUEUE } from './types';

export const getQueues = () => (dispatch) => {
  axios.get('http://localhost:5010/queues')
    .then((res) => {
      dispatch({
        type: GET_QUEUES,
        payload: res.data.queues,
      });
    })
    .catch((err) => {
      log.info(err);
      dispatch({
        type: GET_QUEUES,
        payload: {},
      });
    });
};

export const deleteQueue = () => (dispatch) => {
  axios.delete('http://localhost:5010/queue')
    .then(res => dispatch({
      type: DELETE_QUEUE,
      payload: res.data.queues,
    }))
    .catch((err) => {
      log.error(err);
    });
};
