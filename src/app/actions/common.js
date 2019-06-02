import { getConfig } from '../config/config';

export const getQueueUrl = name => `${getConfig('endpoint')}/queue/${name}`;
