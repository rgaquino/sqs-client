import axios from 'axios';
import log from 'electron-log';
import { getQueueMessages, addToCache, removeFromCache, clearQueue } from '../cache/messageCache';
import { GET_MESSAGES } from './types';

// TODO: This shouldn't be hardcoded.
function getUrl(name) {
  return `http://127.0.0.1:9324/queue/${name}`;
}

export const getMessages = queue => (dispatch) => {
  dispatch({
    type: GET_MESSAGES,
    payload: getQueueMessages(queue),
  });
};

export const sendMessage = (queue, message) => () => {
  const payload = { queue: getUrl(queue), message };
  axios.post('http://localhost:5010/message', payload)
    .then((res) => {
      log.info('Message sent to queue');
      addToCache(queue, res.data.MessageId, message);
      getMessages(queue);
    })
    .catch(err => log.error(err));
};

export const clearMessages = queue => () => {
  const payload = { queue: getUrl(queue) };
  axios.delete('http://localhost:5010/messages', { data: payload })
    .then(() => {
      clearQueue(queue);
      log.info('Messages in queue purged');
      getMessages(queue);
    })
    .catch(err => log.error(err));
};

export const deleteMessage = (queue, messageId) => () => {
  const payload = { queue: getUrl(queue), messageId };
  axios.delete('http://localhost:5010/message', { data: payload })
    .then(() => {
      removeFromCache(queue, messageId);
      log.info(`Message id=${messageId} deleted.`);
      getMessages(queue);
    })
    .catch(err => log.error(err));
};

