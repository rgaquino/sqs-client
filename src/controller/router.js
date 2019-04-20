import express from 'express';
import path from 'path';
import AWS from 'aws-sdk/index';
import log from 'electron-log';

const router = express.Router();

// Load AWS config
AWS.config.loadFromPath(path.join(__dirname, '/../../config/config.json'));
const sqs = new AWS.SQS();

// @route   POST /queues
// @desc    Create a queue
// @access  Public
router.post('/queues', (req, res) => {
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

// @route   GET /queues
// @desc    List all available queues
// @access  Public
router.get('/queues', (req, res) => {
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

export default router;
