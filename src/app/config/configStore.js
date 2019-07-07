import log from 'electron-log';
import Store from 'electron-store';

const store = new Store();

export function initConfig() {
  if (!store.has('accessKeyId')) {
    store.set('accessKeyId', 'DEFAULT_ACCESS_KEY');
  }
  if (!store.has('secretAccessKey')) {
    store.set('secretAccessKey', 'DEFAULT_SECRET_KEY');
  }
  if (!store.has('region')) {
    store.set('region', 'eu-west-2');
  }
  if (!store.has('endpoint')) {
    store.set('endpoint', 'http://127.0.0.1:9324');
  }

  log.info(`connecting to: ${store.get('endpoint')}`);
}

export const getConfig = key => store.get(key);
export const setConfig = (key, value) => store.set(key, value);
