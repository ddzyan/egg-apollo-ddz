'use strict';
const assert = require('assert');

const apollo = require('../../lib/apollo');

module.exports = {
  async initApollo() {
    assert(this.app.config.apolloDdz, 'apolloDdz config is required');
    const bundle = await apollo.remoteConfigServiceSikpCache(this.app.config.apolloDdz);
    this.app.config.apolloConfig = {};
    Object.assign(this.app.config.apolloConfig, bundle);
  },
};
