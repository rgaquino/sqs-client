import log from 'electron-log';
import { getQueueMessages, addToCache, removeFromCache, clearQueue } from '../cache/messageCache';
import { GET_MESSAGES } from './types';
import sqs from '../controllers/sqs';

export const getMessages = queue => (dispatch) => {
  dispatch({
    type: GET_MESSAGES,
    payload: getQueueMessages(queue),
  });
};

// Send a message to a queue
export const sendMessage = (queue, message) => () => {
  log.debug(`DEBUG: sending message to queue="${queue}"`);
  sqs.sendMessage(queue, message)
    .then((res) => {
      log.info(`INFO: message sent to queue="${queue}", id="${res.MessageId}"`);
      addToCache(queue, res.MessageId, message);
      getMessages(queue);
    })
    .catch(err => log.error(`ERROR: failed to send message, queue="${queue}", err="${err}"`));
};

// Purge all messages in queue
export const clearMessages = queue => () => {
  log.debug(`DEBUG: purging messages in queue="${queue}"`);
  sqs.purgeQueue(queue)
    .then(() => {
      clearQueue(queue);
      log.info(`INFO: messages purged queue="${queue}"`);
      getMessages(queue);
    })
    .catch(err => log.error(`ERROR: failed to purge messages, queue="${queue}", err="${err}"`));
};

// Delete a specific message from a queue
export const deleteMessage = (queue, messageId) => () => {
  log.debug(`DEBUG: deleting message id="${messageId}"`);
  sqs.deleteMessage(queue, messageId)
    .then(() => {
      removeFromCache(queue, messageId);
      log.info(`INFO: message deleted id="${messageId}"`);
      getMessages(queue);
    })
    .catch(err => log.error(`ERROR: failed to delete message, queue="${queue}", id="${messageId}", err="${err}"`));
};

