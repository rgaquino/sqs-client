import log from 'electron-log';

import { initialize } from '../controller/aws';

import { GET_QUEUES, GET_QUEUE, GET_MESSAGES } from './types';
import { getQueueMessages } from '../cache/messageCache';
import { getQueueUrl } from './common';

const sqs = initialize();

// List all available queues
export const getQueues = filter => (dispatch) => {
  let params = {};
  if (filter) {
    params = {
      QueueNamePrefix: filter,
    };
  }

  log.info('retrieving list of queues');
  sqs.listQueues(params, (err, data) => {
    if (err) {
      log.error(`failed to get list of queues, err=${err}`);
      dispatch({
        type: GET_QUEUES,
        payload: [],
      });
      return err;
    }

    let queues = [];
    if (data.queues) {
      queues = data.QueueUrls.map(q => q.substring(q.lastIndexOf('/') + 1));
    }
    dispatch({
      type: GET_QUEUES,
      payload: queues,
    });
    return data;
  });
};

// Create a queue
export const createQueue = (name, history) => () => {
  const params = {
    QueueName: name,
  };

  log.info(`creating queue "${name}"...`);
  sqs.createQueue(params, (err, data) => {
    if (err) {
      log.error(`failed to create queue "${name}"`);
      return err;
    }

    getQueues();
    history.push('/');
    return data;
  });
};

// Delete queue
export const deleteQueue = (name, history) => () => {
  const params = {
    QueueUrl: getQueueUrl(name),
  };

  log.info(`deleting queue ${name}`);
  sqs.deleteQueue(params, (err, data) => {
    if (err) {
      log.error(`failed to delete queue ${name}`);
      return err;
    }

    getQueues();
    history.push('/');
    return data;
  });
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
