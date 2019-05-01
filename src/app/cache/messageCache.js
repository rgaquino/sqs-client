const messages = {};

export const addToCache = (queue, id, body) => {
  if (!messages[queue]) {
    messages[queue] = [];
  }
  messages[queue].push({ id, body });
};

export const getMessages = function getMessages(queue) {
  return !messages[queue] ? [] : messages[queue];
};
