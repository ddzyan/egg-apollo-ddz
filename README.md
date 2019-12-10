## 简介
egg apollo 配置，主要解决现有模块包 egg-apollo 以下问题：
1. 配置过于复杂，需要修改启动命令，创建额外配置文件
2. apollo 无法进行热更新配置，但是在代码中还设置了定时器任务30s去获取更新
3. github 代码不开源，其他fork的模块包代码不是最新
4. 源代码中缺少 test 单元测试文件，无法验证代码是否有效


### 使用
#### 安装
```
yarn add egg-apollo-ddz
```
#### 配置
```js
// plugin.js
exports.eggApollo = {
  enable: true,
  package: "egg-apollo-ddz"
};
```

#### 插件配置
需要在config.*.js 文件中配置以下参数：
```js
apolloDdz: {
    configServerUrl: 'http://10.199.5.241:8080',
    appId: 'egg-gateway-eos', // 配置中心命名和项目名称保持一致,
    clusterName: 'default',
    namespaceName: [ 'application' ], // 两个namespace相同配置，application配置会覆盖'python.mysql'
    apolloEnv: 'dev',
    interval: '30s',
    disable: true,
  }
```

配置获取成功后，将会把获取的配置参数会转换为对象，保存在config.apolloConfig中，。如果设置了定时更新，则会不断更新内存中的配置，获取方式如下
```js
app.config.apolloConfig.node_config
```

### 更新记录
#### 1.0.0
1. 初始化代码，完成单元测试

### 1.0.1
1. 将初始化代码转移到appication中，给应用进行初始化

### 1.0.2
1. 解决单元测试中遇到的BUG

### 1.0.3
1. 增加初始化完成的打印，用于debug