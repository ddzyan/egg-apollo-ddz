'use strict';

const fs = require('fs');
const path = require('path');

const apollo = require('./lib/apollo');

const apolloConfigFilePath = path.join(__dirname, '/config/apollo.json');
if (fs.existsSync(apolloConfigFilePath)) {
  const configFilePath = path.join(__dirname, '/config/apollo-config.json');
  if (fs.existsSync(configFilePath)) {
    fs.unlinkSync(configFilePath);
  }

  const apolloConfig = require(apolloConfigFilePath);
  apollo.remoteConfigServiceSikpCache(apolloConfig).then(config => {
    const configStr = JSON.stringify(config);
    fs.appendFileSync(configFilePath, configStr);
    // fs.unlinkSync(configFilePath);
    console.log('apollo 初始化完成');
  }).catch(err => {
    throw err;
  });
} else {
  console.error(`${apolloConfigFilePath} not fund`);
}

