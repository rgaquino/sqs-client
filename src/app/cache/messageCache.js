import log from 'electron-log';

//  <queue_name>:
//    <message_id>:
//      body:
//      message:
const messages = {};

export const addToCache = (queue, id, message) => {
  if (!messages[queue]) {
    messages[queue] = {};
  }
  messages[queue][id] = {
    body: message,
    timestamp: new Date().toString(),
  };
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

export const getQueueCount = queue => (!messages[queue] ? 0 : Object.keys(messages[queue]).length);
