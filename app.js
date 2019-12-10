'use strict';
const apollo = require('./lib/apollo');
const assert = require('assert');

module.exports = app => {
  // 异步初始化 apollo 配置，如果不成功，则不会启动应用
  app.beforeStart(async () => {
    assert(app.config.apolloDdz, 'apolloDdz config is required');
    const bundle = await apollo.remoteConfigServiceSikpCache(app.config.apolloDdz);
    app.config.apolloConfig = {};
    Object.assign(app.config.apolloConfig, bundle);
  });

  return app;
};
