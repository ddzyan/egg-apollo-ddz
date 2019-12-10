'use strict';
const assert = require('assert');


module.exports = {
  // 通过不带缓存的Http接口从Apollo读取配置
  getConfigSkipCacheUri(config) {
    const { configServerUrl, appId, clusterName, namespaceName, releaseKey, clientIp } = config;
    assert(configServerUrl, 'configServerUrl is required');
    assert(namespaceName, 'namespaceName is required');
    assert(appId, 'appId is required');
    assert(clusterName, 'clusterName is required');
    if (Array.isArray(namespaceName)) {
      if (namespaceName.length === 0) return [ `${configServerUrl}/configs/${appId}/${clusterName}/application?releaseKey=${releaseKey}&ip=${clientIp}` ];
      return namespaceName.map(n => `${configServerUrl}/configs/${appId}/${clusterName}/${n}?releaseKey=${releaseKey}&ip=${clientIp}`);
    }
    return [ `${configServerUrl}/configs/${appId}/${clusterName}/${namespaceName}?releaseKey=${releaseKey}&ip=${clientIp}` ];

  },
  // 合并配置
  mergeConfigurations(payload) {
    assert(Array.isArray(payload), 'Apollo config should be an array');
    try {
      const confs = [];
      // 将配置的json数据，解析转换为对象
      for (const res of payload) {
        const configurations = res.data.configurations || res.data;
        for (const key in configurations) {
          configurations[key] = JSON.parse(configurations[key]);
        }
        confs.push({ ...configurations });
      }
      // 从缓存和非缓存获取的response报文不一致
      return Object.assign({}, ...confs);
    } catch (err) {
      assert(err, 'Apollo configs not be merged');
    }
  },
};
