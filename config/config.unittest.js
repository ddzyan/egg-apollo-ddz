'use strict';

module.exports = {
  apolloDdz: {
    configServerUrl: 'http://10.199.5.241:8080',
    appId: 'egg-gateway-eos', // 配置中心命名和项目名称保持一致,
    clusterName: 'default',
    namespaceName: ['application'], // 两个namespace相同配置，application配置会覆盖'python.mysql'
    apolloEnv: 'dev',
    interval: '30s',
    disable: true,
  },
};
