'use strict';
module.exports = () => {
  return {
    apolloDdz: {
      configServerUrl: 'http://10.199.5.241:8080',
      appId: 'plutus-node-eos',
      clusterName: 'default',
      namespaceName: [
        'application',
      ],
      apolloEnv: 'dev',
      interval: 'interval',
      disable: false,
    },
  };
};
