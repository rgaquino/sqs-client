import path from 'path';
import AWS from 'aws-sdk/index';

export function initialize() {
  // Load AWS config
  AWS.config.loadFromPath(path.join(__dirname, '/../config/config.json'));
  return new AWS.SQS();
}
