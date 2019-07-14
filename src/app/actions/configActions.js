import log from 'electron-log';

import sqs from '../controllers/sqs';
import {
  getConfig,
  setConfig,
  CONFIG_ACCESS_KEY_ID,
  CONFIG_SECRET_ACCESS_KEY_ID,
  CONFIG_REGION,
  CONFIG_ENDPOINT,
} from '../controllers/config';
import { GET_CONN_CONFIG } from './types';

export const getConnectionConfig = () => (dispatch) => {
  log.debug('retrieving connection configuration...');
  dispatch({
    type: GET_CONN_CONFIG,
    payload: {
      accessKeyId: getConfig(CONFIG_ACCESS_KEY_ID),
      secretAccessKey: getConfig(CONFIG_SECRET_ACCESS_KEY_ID),
      region: getConfig(CONFIG_REGION),
      endpoint: getConfig(CONFIG_ENDPOINT),
    },
  });
};

export const setConnectionConfig = (config, history) => () => {
  log.debug('saving new connection configuration...');

  // Save config in electron-store
  setConfig(CONFIG_ACCESS_KEY_ID, config.accessKeyId);
  setConfig(CONFIG_SECRET_ACCESS_KEY_ID, config.secretAccessKey);
  setConfig(CONFIG_REGION, config.region);
  setConfig(CONFIG_ENDPOINT, config.endpoint);

  // Load SQS controller from provided configuration
  sqs.initialize({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.region,
    endpoint: config.endpoint,
  })
    .then(() => {
      getConnectionConfig();
      history.push('/queues');
    });
};
