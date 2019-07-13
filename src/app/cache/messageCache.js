import log from 'electron-log';

const messages = {};

export const addToCache = (queue, id, body) => {
  if (!messages[queue]) {
    messages[queue] = {};
  }
  messages[queue][id] = body;
  log.debug(`queue=${queue} contents: ${JSON.stringify(messages[queue])}`);
};

export const removeFromCache = (queue, id) => {
  delete messages[queue][id];
  log.debug(`queue=${queue} contents: ${JSON.stringify(messages[queue])}`);
};

export const clearQueue = (queue) => {
  delete messages[queue];
};

export const getQueueMessages = queue => (!messages[queue] ? {} : messages[queue]);
