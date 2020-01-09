'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const apollo = require('egg-apollo-ddz');

const env = process.env.NODE_ENV || 'local';

const confilgFileName = `config.${env}.js`;

const apolloConfigFilePath = path.join(__dirname, '/config/', confilgFileName);
if (fs.existsSync(apolloConfigFilePath)) {
  const configFilePath = path.join(__dirname, '/config/apollo-config.json');
  if (fs.existsSync(configFilePath)) {
    fs.unlinkSync(configFilePath);
  }

  const apolloConfig = require(apolloConfigFilePath)();
  assert(apolloConfig.apolloDdz, 'apolloDdz 配置 不存在');
  apollo.remoteConfigServiceSikpCache(apolloConfig.apolloDdz).then(config => {
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

