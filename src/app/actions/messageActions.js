import log from 'electron-log';
import { getQueueMessages, addToCache, removeFromCache, clearQueue } from '../cache/messageCache';
import { GET_MESSAGES } from './types';
import { getQueueUrl } from './common';
import { initialize } from '../controller/aws';

const sqs = initialize();

export const getMessages = queue => (dispatch) => {
  dispatch({
    type: GET_MESSAGES,
    payload: getQueueMessages(queue),
  });
};

// Send a message to a queue
export const sendMessage = (queue, message) => () => {
  const params = {
    MessageBody: message,
    QueueUrl: getQueueUrl(queue),
  };

  log.info(`sending message to ${queue}`);
  sqs.sendMessage(params, (err, data) => {
    if (err) {
      log.error(`failed to send message to ${queue}`);
      return err;
    }

    addToCache(queue, data.MessageId, message);
    getMessages(queue);
    return data;
  });
};

// Purge all messages in queue
export const clearMessages = queue => () => {
  const params = {
    QueueUrl: getQueueUrl(queue),
  };

  log.info(`clearing all messages in ${queue}`);
  sqs.purgeQueue(params, (err, data) => {
    if (err) {
      log.error(`failed to clear queue ${queue}`);
      return { error: err };
    }

    clearQueue(queue);
    log.info('Messages in queue purged');
    getMessages(queue);
    return data;
  });
};

// Delete a specific message from a queue
export const deleteMessage = (queue, messageId) => () => {
  const params = {
    QueueUrl: getQueueUrl(queue),
    ReceiptHandle: messageId,
  };

  log.info(`deleting ${messageId} from ${queue}`);
  sqs.deleteMessage(params, (err, data) => {
    if (err) {
      log.error(`failed to delete message from ${queue}`);
      return { error: err };
    }

    removeFromCache(queue, messageId);
    log.info(`Message id=${messageId} deleted.`);
    getMessages(queue);
    return data;
  });
};

