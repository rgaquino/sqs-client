import { getConfig } from '../controllers/config';

export const getQueueUrl = name => `${getConfig('endpoint')}/queue/${name}`;
