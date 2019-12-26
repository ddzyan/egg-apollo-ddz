## 简介
egg apollo 配置，主要解决现有模块包 egg-apollo 以下问题：
1. 配置过于复杂，需要修改启动命令，创建额外配置文件
2. apollo 无法进行热更新配置，但是在代码中还设置了定时器任务30s去获取更新
3. github 代码不开源，其他fork的模块包代码不是最新
4. 源代码中缺少 test 单元测试文件，无法验证代码是否有效

通过简单的配置，动态去 apollo 中心异步获取配置信息，并且在项目启动之前进行加载，并且能够解决例如 egg-suqelize 插件的数据库配置问题。

### 设计思路
1. 插件初始化时(beforstart)，在插件的 agant.js 中异步获取动态配置信息，输出到插件 config 目录下的 apollo-option.json 中
2. 在插件 config 目录下的 config.default.js 进行读取加载 apollo-option.json 配置信息
3. 修改 egg-development 中 ignore  文件，添加 apollo-option.json，否则会因为文件修改导致项目重启。
4. 插件中设置定时器，定时异步获取动态配置信息，并且进行更新 this.config 对象
5. 当项目意外停止或者正常关闭的时候，如果服务进行了注册则进行注销


## 使用
### 安装
```
yarn add egg-apollo-ddz
```

### 配置
```js
// plugin.js
exports.eggApollo = {
  enable: true,
  package: "egg-apollo-ddz"
};
```

### 插件配置
需要在config/config.*.js 文件中配置以下参数：
```js
apolloDdz: {
    configServerUrl: 'http://127.0.0.1:8080',
    appId: 'egg-gateway-eos', // 配置中心命名和项目名称保持一致,
    clusterName: 'default',
    namespaceName: [ 'application' ], // 两个namespace相同配置，application配置会覆盖'python.mysql'
    apolloEnv: 'dev',
    interval: '30s', // 动态属性时间
    disable: true,// 是否设置动态刷新
  }
```

创建 /config/apollo.json 存放一份apollo配置
```json
{
  "configServerUrl": "http://127.0.0.1:8080",
  "appId": "plutus-node-eos",
  "clusterName": "default",
  "namespaceName": [
    "application"
  ],
  "apolloEnv": "dev",
}
```

在项目根目录下创建初始化脚本 fist_load.js
```js
'use strict';

const fs = require('fs');
const path = require('path');

const apollo = require('egg-apollo-ddz');

const apolloConfigFilePath = path.join(__dirname, '/config/apollo.json');
if (fs.existsSync(apolloConfigFilePath)) {
  const configFilePath = path.join(__dirname, '/config/apollo-config.json');
  if (fs.existsSync(configFilePath)) {
    fs.unlinkSync(configFilePath);
  }

  const apolloConfig = require(apolloConfigFilePath);
  apollo.remoteConfigServiceSikpCache(apolloConfig).then(config => {
    const configStr = JSON.stringify(config);
    fs.appendFileSync(configFilePath, configStr);
    // fs.unlinkSync(configFilePath);
    console.log('apollo 初始化完成');
  }).catch(err => {
    throw err;
  });
} else {
  console.error(`${apolloConfigFilePath} not fund`);
}

```

修改package.json文件中的启动脚本，添加 node fist_load.js，请参考项目中的配置

## 更新记录
### 2.0.0 大版本更新
由于 egg loader 的加载机制首先会合并插件，框架和应用所有的config配置，所以在config中读取未生成的json文件会报错(json文件生成在config之后)。所以修改为在启动egg项目之前，执行fist_load.js脚本生成异步配置，用于egg启动后的config整合。

### 2.0.2
1. 修改package.json main 配置,优化使用方法