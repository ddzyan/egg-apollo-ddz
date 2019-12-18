/* 'use strict';
const assert = require('assert');
const fs = require('fs');
const apollo = require('./lib/apollo');

module.exports = async app => {
  app.beforeStart(async () => {
    try {
      assert(app.config.apolloDdz, 'apolloDdz config is required');
      const config = await apollo.remoteConfigServiceSikpCache(app.config.apolloDdz);
      // this.coreLogger.info(`apollo 初始化完成${new Date()}`, bundle);
      let configText = "'use strict';\n";
      configText = configText + 'module.exports = () => {\n return';
      configText = configText + JSON.stringify(config);
      configText = configText + '};};';
      fs.appendFileSync('./config/config.qqq.js', configText);
    } catch (error) {
      console.error(error);
    }
  });
};
 */
