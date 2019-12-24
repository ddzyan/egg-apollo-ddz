'use strict';

const mock = require('egg-mock');
const assert = require('assert');

describe('test/apollo-ddz.test.js', () => {
  it('init apollo ', async () => {
    const app = mock.app();
    await app.ready();
    assert(app.config.nodeConfig, ' apollo 配置获取失败');
  });
});
