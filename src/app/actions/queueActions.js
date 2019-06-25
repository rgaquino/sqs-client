import axios from 'axios';
import log from 'electron-log';

import { GET_QUEUES, GET_QUEUE, GET_MESSAGES } from './types';
import { getQueueMessages } from '../cache/messageCache';
import { getQueueUrl } from './common';

export const getQueues = filter => (dispatch) => {
  let url = 'http://localhost:5010/queues';
  if (filter) {
    url = `${url}?q=${filter}`;
  }
  axios.get(url)
    .then((res) => {
      let queues = [];
      if (res.data.queues) {
        queues = res.data.queues.map(q => q.substring(q.lastIndexOf('/') + 1));
      }
      dispatch({
        type: GET_QUEUES,
        payload: queues,
      });
    })
    .catch((err) => {
      log.error(err);
      dispatch({
        type: GET_QUEUES,
        payload: [],
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
  const payload = { queue: getQueueUrl(name) };
  axios.delete('http://localhost:5010/queue', { data: payload })
    .then(() => {
      getQueues();
      history.push('/');
    })
    .catch(err => log.error(err));
};

export const getQueue = queue => (dispatch) => {
  dispatch({
    type: GET_QUEUE,
    payload: queue,
  });
  dispatch({
    type: GET_MESSAGES,
    payload: getQueueMessages(queue),
  });
};
