// TODO: There must be a better way to do this.
import path from 'path';
import log from 'electron-log';
import Store from 'electron-store';

const fs = require('fs');

const store = new Store();

export function initConfig() {
  fs.readFile(path.join(__dirname, '/../../../config/config.json'), (err, data) => {
    let config;
    if (!err) {
      config = JSON.parse(data);
    } else {
      // TODO: Handle non-existent configuration file
    }
    log.debug(`configuration file: ${config}`);

    store.store = config;
    log.info(`connecting to: ${store.get('endpoint')}`);
  });
}

export const getConfig = key => store.get(key);
