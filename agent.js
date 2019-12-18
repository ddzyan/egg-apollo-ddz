'use strict';
const assert = require('assert');
const fs = require('fs');
const apollo = require('./lib/apollo');

module.exports = async agent => {
  agent.beforeStart(async () => {
    assert(agent.config.apolloDdz, 'apolloDdz config is required');
    const config = await apollo.remoteConfigServiceSikpCache(agent.config.apolloDdz);


    const configFilePath = __dirname + '/config/apollo-config.json';

    if (fs.existsSync(configFilePath)) {
      fs.unlinkSync(configFilePath);
    }
    const configStr = JSON.stringify(config);
    fs.appendFileSync(configFilePath, configStr);
    agent.coreLogger.info(`apollo 初始化完成${new Date()}`);
  });
};
