import log from 'electron-log';

import { GET_QUEUES, GET_QUEUE, GET_MESSAGES } from './types';
import { getQueueMessages } from '../cache/messageCache';
import { getQueueUrl } from './common';
import sqs from '../controllers/sqs';

// List all available queues
export const getQueues = filter => (dispatch) => {
  sqs.listQueues(filter)
    .then((res) => {
      let queues = [];
      if (res.queues) {
        queues = res.queues.map(q => q.substring(q.lastIndexOf('/') + 1));
      }
      dispatch({
        type: GET_QUEUES,
        payload: queues,
      });
    })
    .catch((err) => {
      log.error(`failed to list queues, err=${err}`);
      dispatch({
        type: GET_QUEUES,
        payload: [],
      });
    });
};

// Create a queue
export const createQueue = (name, history) => () => {
  sqs.createQueue(name)
    .then(() => {
      getQueues();
      history.push('/queues');
    })
    .catch(err => log.error(`failed to create queue, name=${history}, err=${err}`));
};

// Delete queue
export const deleteQueue = (name, history) => () => {
  sqs.deleteQueue(getQueueUrl(name))
    .then(() => {
      getQueues();
      history.push('/queues');
    })
    .catch(err => log.error(`failed to delete queue, ame=${history}, err=${err}`));
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
