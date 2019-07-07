import log from 'electron-log';

import { getConfig, setConfig } from '../config/configStore';
import { GET_CONN_CONFIG } from './types';

export const getConnectionConfig = () => (dispatch) => {
  log.debug('retrieving connection configuration...');
  dispatch({
    type: GET_CONN_CONFIG,
    payload: {
      accessKeyId: getConfig('accessKeyId'),
      secretAccessKey: getConfig('secretAccessKey'),
      region: getConfig('region'),
      endpoint: getConfig('endpoint'),
    },
  });
};

export const setConnectionConfig = config => () => {
  log.debug('saving new connection configuration...');
  setConfig('accessKeyId', config.accessKeyId);
  setConfig('secretAccessKey', config.secretAccessKey);
  setConfig('region', config.region);
  setConfig('endpoint', config.endpoint);
  getConnectionConfig();
  // TODO: Reload connection to use new configuration
};
