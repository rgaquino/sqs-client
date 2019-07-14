import log from 'electron-log';
import Store from 'electron-store';

// Configuration Names
export const CONFIG_ACCESS_KEY_ID = 'accessKeyId';
export const CONFIG_SECRET_ACCESS_KEY_ID = 'secretAccessKey';
export const CONFIG_REGION = 'region';
export const CONFIG_ENDPOINT = 'endpoint';

const store = new Store();

export function initConfig() {
  if (!store.has(CONFIG_ACCESS_KEY_ID)) {
    store.set(CONFIG_ACCESS_KEY_ID, 'DEFAULT_ACCESS_KEY');
  }
  if (!store.has(CONFIG_SECRET_ACCESS_KEY_ID)) {
    store.set(CONFIG_SECRET_ACCESS_KEY_ID, 'DEFAULT_SECRET_KEY');
  }
  if (!store.has(CONFIG_REGION)) {
    store.set(CONFIG_REGION, 'eu-west-2');
  }
  if (!store.has(CONFIG_ENDPOINT)) {
    store.set(CONFIG_ENDPOINT, 'http://127.0.0.1:9324');
  }

  log.info(`INFO: connecting to: ${store.get('endpoint')}`);
}

export const getConfig = key => store.get(key);
export const setConfig = (key, value) => store.set(key, value);
