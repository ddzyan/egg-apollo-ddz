'use strict';

const mock = require('egg-mock');
const assert = require('assert');

describe('test/apollo_update_apollo_schdule.test.js', () => {
  it('should schedule work fine', async () => {
    const app = mock.app();
    await app.ready();
    await app.initApollo();
    await app.runSchedule('update_apollo');
    assert(app.config.nodeConfig, 'apollo nodeConfig 配置不存在');
  });
});
