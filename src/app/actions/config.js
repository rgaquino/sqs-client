import { getConfig } from '../config/config';
import { GET_CONN_CONFIG } from './types';

export const getConnectionConfig = () => (dispatch) => {
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
