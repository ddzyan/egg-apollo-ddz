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
    interval: '30s', // 动态属性时间
    disable: true,// 是否设置动态刷新
  }
```

配置获取成功后，将会把获取的配置参数会转换为对象，保存在config对象中，。如果设置了定时更新，则会不断更新内存中的配置，获取方式如下
```js
app.config.node_config
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

### 1.0.4
1. 将获得的 apollo 配置，添加到 config 对象中，并且修改单元测试文件

### 1.0.5
1. 去除无关的打印信息

### 1.0.6
1. 初始化完成，打印获取的配置信息

### 1.0.7 
1. 修改配置文件获取方式，解决例如 egg-sequelize 插件无法获取 apollo 配置的参数

### 1.10.0
1. 解决在config.default.js中读取配置导致的BUG

### 1.10.1
1. 去除无关代码
