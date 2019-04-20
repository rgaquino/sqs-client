import AWS from 'aws-sdk/index';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import log from 'electron-log/electron-log';

function controller() {
  // Load AWS config.
  AWS.config.loadFromPath(path.join(__dirname, '/config/config.json'));
  const sqs = new AWS.SQS();

  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Create queues
  app.post('/queues', (req, res) => {
    const params = {
      QueueName: req.body.name,
    };

    log.info(`Creating queue "${req.body.name}"...`);
    sqs.createQueue(params, (err, data) => {
      if (err) {
        res.status(500)
          .json(err);
      } else {
        res.status(201)
          .json(data);
      }
    });
  });

  // List queues
  app.get('/queues', (req, res) => {
    sqs.listQueues((err, data) => {
      if (err) {
        res.status(200)
          .json(err);
      } else {
        res.status(200)
          .json({
            queues: data.QueueUrls,
          });
      }
    });
  });

  app.listen(5010);
}

export default controller;
