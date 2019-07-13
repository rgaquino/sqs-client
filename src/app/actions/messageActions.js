import log from 'electron-log';
import { getQueueMessages, addToCache, removeFromCache, clearQueue } from '../cache/messageCache';
import { GET_MESSAGES } from './types';
import { getQueueUrl } from './common';
import sqs from '../controller/sqs';

export const getMessages = queue => (dispatch) => {
  dispatch({
    type: GET_MESSAGES,
    payload: getQueueMessages(queue),
  });
};

// Send a message to a queue
export const sendMessage = (queue, message) => () => {
  sqs.sendMessage(getQueueUrl(queue), message)
    .then((res) => {
      log.info('Message sent to queue');
      addToCache(queue, res.data.MessageId, message);
      getMessages(queue);
    })
    .catch(err => log.error(err));
};

// Purge all messages in queue
export const clearMessages = queue => () => {
  sqs.purgeQueue(getQueueUrl(queue))
    .then(() => {
      clearQueue(queue);
      log.info('Messages in queue purged');
      getMessages(queue);
    })
    .catch(err => log.error(err));
};

// Delete a specific message from a queue
export const deleteMessage = (queue, messageId) => () => {
  sqs.deleteMessage(getQueueUrl(getQueueUrl(queue), messageId))
    .then(() => {
      removeFromCache(queue, messageId);
      log.info(`Message id=${messageId} deleted.`);
      getMessages(queue);
    })
    .catch(err => log.error(err));
};

