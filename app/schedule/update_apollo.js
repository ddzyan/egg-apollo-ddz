'use strict';

const apollo = require('../../lib/apollo');
module.exports = app => {
  const { interval, disable } = app.config.apolloDdz;
  return {
    schedule: {
      interval: interval || '30s',
      immediate: true, // 这个定时 任务会在应用启动并 ready 后立刻执行一次这个定时任务
      type: 'worker', // 每台机器上只有一个 worker 会执行这个定时任务，每次执行定时任务的 worker 的选择是随机的,
      disable: disable || true,
    },
    async task() {
      const result = await apollo.remoteConfigServiceSikpCache(app.config.apolloDdz);
      if (result && result.status === 304) {
        app.coreLogger.info('apollo 没有更新');
      } else {
        Object.assign(app.config, result);
        app.coreLogger.info(`apollo 更新完成${new Date()}`);
      }
    },
  };
};
