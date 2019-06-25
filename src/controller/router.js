import express from 'express';
import path from 'path';
import AWS from 'aws-sdk/index';
import log from 'electron-log';

const router = express.Router();

// Load AWS config
AWS.config.loadFromPath(path.join(__dirname, '/../../config/config.json'));
const sqs = new AWS.SQS();

// @route   GET /queue
// @desc    List all available queues
// @access  Public
router.get('/queues', (req, res) => {
  const params = {
    QueueNamePrefix: req.query.q,
  };

  log.info('retrieving list of queues');
  sqs.listQueues(params, (err, data) => {
    if (err) {
      log.error('failed to get list of queues');
      res.status(500)
        .json(err);
    } else {
      res.status(200)
        .json({
          queues: data.QueueUrls,
        });
    }
  });
});

// @route   POST /queue
// @desc    Create a queue
// @access  Public
router.post('/queue', (req, res) => {
  const params = {
    QueueName: req.body.name,
  };

  log.info(`creating queue "${req.body.name}"...`);
  sqs.createQueue(params, (err, data) => {
    if (err) {
      log.error(`failed to create queue "${req.body.name}"`);
      res.status(500)
        .json(err);
    } else {
      res.status(201)
        .json(data);
    }
  });
});

// @route   DELETE /queue
// @desc    Delete queue
// @access  Public
router.delete('/queue', (req, res) => {
  const params = {
    QueueUrl: req.body.queue,
  };

  log.info(`deleting queue ${req.body.queue}`);
  sqs.deleteQueue(params, (err, data) => {
    if (err) {
      log.error(`failed to delete queue ${req.body.queue}`);
      res.status(500)
        .json(err);
    } else {
      res.status(200)
        .json(data);
    }
  });
});

// @route   POST /message
// @desc    Send a message to a queue
// @access  Public
router.post('/message', (req, res) => {
  const params = {
    MessageBody: req.body.message,
    QueueUrl: req.body.queue,
  };

  log.info(`sending message to ${req.body.queue}`);
  sqs.sendMessage(params, (err, data) => {
    if (err) {
      log.error(`failed to send message to ${req.body.queue}`);
      res.status(500)
        .json(err);
    } else {
      res.status(201)
        .json(data);
    }
  });
});

// @route   DELETE /messages
// @desc    Purge all messages in queue
// @access  Public
router.delete('/messages', (req, res) => {
  const params = {
    QueueUrl: req.body.queue,
  };

  log.info(`clearing all messages in ${req.body.queue}`);
  sqs.purgeQueue(params, (err, data) => {
    if (err) {
      log.error(`failed to clear queue ${req.body.queue}`);
      res.status(500)
        .json(err);
    } else {
      res.status(200)
        .json(data);
    }
  });
});

// @route   DELETE /message
// @desc    Delete a specific message from a queue
// @access  Public
router.delete('/message', (req, res) => {
  const params = {
    QueueUrl: req.body.queue,
    ReceiptHandle: req.body.messageId,
  };

  log.info(`deleting ${req.body.messageId} from ${req.body.queue}`);
  sqs.deleteMessage(params, (err, data) => {
    if (err) {
      log.error(`failed to delete message from ${req.body.queue}`);
      res.status(500)
        .json(err);
    } else {
      res.status(201)
        .json(data);
    }
  });
});

// @route   GET /message
// @desc    Retrieves a message from a queue
// @access  Public
router.get('/message', (req, res) => {
  const params = {
    QueueUrl: req.body.queue,
  };

  log.info(`retrieving message from ${req.body.queue}`);
  sqs.receiveMessage(params, (err, data) => {
    if (err) {
      log.error(`failed to retrieve message from ${req.body.queue}`);
      res.status(500)
        .json(err);
    } else {
      res.status(201)
        .json(data);
    }
  });
});


export default router;
