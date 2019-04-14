// Load AWS config.
import AWS from 'aws-sdk';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import log from 'electron-log';

module.exports = function queue() {
  AWS.config.loadFromPath(path.join(__dirname, '/config/config.json'));
  const sqs = new AWS.SQS();

  const expressApp = express();
  expressApp.use(bodyParser.json());
  expressApp.use(bodyParser.urlencoded({ extended: true }));

  expressApp.post('/sqs-queue-test', (req, res) => {
    const params = {
      QueueName: req.body.name,
    };

    log.info(`Creating queue "${req.body.name}"...`);
    sqs.createQueue(params, (err, data) => {
      if (err) {
        res.status(500);
        res.body = 'Error happened :(';
      } else {
        res.status(201);
        res.body = 'Created queue baby!';
      }
      log.info(res.body);
    });
  });

  expressApp.listen(5010);
};
