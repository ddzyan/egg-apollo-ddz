'use strict';
const assert = require('assert');

const apollo = require('../../lib/apollo');

module.exports = {
  async initApollo() {
    assert(this.config.apolloDdz, 'apolloDdz config is required');
    const bundle = await apollo.remoteConfigServiceSikpCache(this.config.apolloDdz);
    this.config.apolloConfig = {};
    Object.assign(this.config.apolloConfig, bundle);
  },
};
