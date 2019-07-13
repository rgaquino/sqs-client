import path from 'path';
import AWS from 'aws-sdk/index';

const sqs = {};

export function initialize() {
  // Load AWS config
  AWS.config.loadFromPath(path.join(__dirname, '/../config/config.json'));
  sqs.client = new AWS.SQS();
}

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
      QueueUrl: queue,
    };
    sqs.client.deleteQueue(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export default sqs;
