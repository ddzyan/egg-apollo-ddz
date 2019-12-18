'use strict';
const assert = require('assert');

const apollo = require('../../lib/apollo');

module.exports = {
  async initApollo() {
    assert(this.config.apolloDdz, 'apolloDdz config is required');
    const bundle = await apollo.remoteConfigServiceSikpCache(this.config.apolloDdz);
    this.coreLogger.info(`apollo 初始化完成${new Date()}`, bundle);
    return bundle;
  },
};
