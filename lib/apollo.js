'use strict';
const assert = require('assert');
const urllib = require('urllib');

const helper = require('./helper.js');

module.exports = {
  remoteConfigServiceSikpCache: async config => {
    assert(config, 'parmas config is required');
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      rejectUnauthorized: false,
      contentType: 'json',
      dataType: 'json',
    };
    const urls = helper.getConfigSkipCacheUri(config);

    // 如果配置没有更新则返回空
    const bundle = await Promise.all(urls.map(uri => urllib.request(uri, options)));
    for (const res of bundle) {
      if (res.status === 304) { // 不用修改
        return res;
      }
      assert(res.status === 200, 'apollo host unavailable, please contact your administrtor');
      if (res.data.namespaceName === 'application') {
        // 缓存 releaseKey ， 在发送请求时候带入到url中
        config.releaseKey = res.data.releaseKey;
      }
    }
    return helper.mergeConfigurations(bundle);
  },
};
