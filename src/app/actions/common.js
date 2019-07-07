import { getConfig } from '../config/configStore';

export const getQueueUrl = name => `${getConfig('endpoint')}/queue/${name}`;
