'use strict';

const mock = require('egg-mock');
const assert = require('assert');

describe('test/apollo-ddz.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/apollo-ddz-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    assert(app.config.apolloConfig, 'apolloConfig apollo 配置获取失败');
  });
});
