import AWS from 'aws-sdk/index';

const sqs = {};

function getQueueUrl(name) {
  return `${AWS.config.endpoint}/queue/${name}`;
}

sqs.initialize = function initialize(config) {
  return new Promise((resolve) => {
    // Load AWS config
    AWS.config = new AWS.Config(config);
    sqs.client = new AWS.SQS();
    resolve();
  });
};

sqs.listQueues = function listQueues(filter) {
  return new Promise((resolve, reject) => {
    const params = {
      QueueNamePrefix: filter,
    };
    sqs.client.listQueues(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve({
        queues: data.QueueUrls,
      });
    });
  });
};

sqs.createQueue = function createQueue(name) {
  return new Promise((resolve, reject) => {
    const params = {
      QueueName: name,
    };
    sqs.client.createQueue(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

sqs.deleteQueue = function deleteQueue(queue) {
  return new Promise((resolve, reject) => {
    const params = {
      QueueUrl: getQueueUrl(queue),
    };
    sqs.client.deleteQueue(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

sqs.purgeQueue = function purgeQueue(queue) {
  return new Promise((resolve, reject) => {
    const params = {
      QueueUrl: getQueueUrl(queue),
    };

    sqs.client.purgeQueue(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

sqs.sendMessage = function sendMessage(queue, message) {
  return new Promise((resolve, reject) => {
    const params = {
      QueueUrl: getQueueUrl(queue),
      MessageBody: message,
    };
    sqs.client.sendMessage(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

sqs.deleteMessage = function deleteMessage(queue, messageId) {
  return new Promise((resolve, reject) => {
    const params = {
      QueueUrl: getQueueUrl(queue),
      ReceiptHandle: messageId,
    };
    sqs.client.deleteMessage(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export default sqs;
