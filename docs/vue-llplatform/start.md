# 起步
本章节介绍搭建初步的项目环境。

## 依赖环境
1. node：点击[node](https://nodejs.org/zh-cn/)访问官方下载安装
2. vue-cli：`npm install -g vue-cli`

## 初始项目搭建
利用vue-cli创建vue项目
``` bash
vue init webpack vue-llplatform
```
::: tip 提示
项目初始化会提示输入一些自定义配置，全部回车选择默认配置即可。

国内最后一步`npm install`可能失败，你可以先安装淘宝镜像cnpm（`npm install -g cnpm --registry=https://registry.npm.taobao.org`），再用cnpm安装依赖（`cnpm install`），但注意这也许会丢失一些东西。
:::
此时可以得到一个vue-llplatform文件夹，即项目demo，你可以通过以下命令启动它，然后浏览器访问[localhost:8080](localhost:8080)，即可看到一个demo页面：
``` bash
cd vue-llplatform
npm run dev
```
<img src="/assets/img/vue-llplatform/start-demo.png" height="450" width="400" style="border: 1px solid #000">

## 安装Element
本项目选择饿了么的[Element组件库](http://element-cn.eleme.io/#/zh-CN/component/installation)，个人感觉其风格看起来更舒服。
1. 安装Element
``` bash
npm i element-ui -S
```
2. 引入Element：修改`src/main.js`文件，添加以下三行
``` js {4,5,8}
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```
3. 此时你已添加了Element，你可以修改`src/components/HelloWorld.vue`文件，添加一个Element的按钮组件来查看是否添加成功：
``` html {3}
<template>
  <div class="hello">
    <el-button>按钮</el-button>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
       ......
```

<img src="/assets/img/vue-llplatform/start-demo-element.png" height="450" width="400" style="border: 1px solid #000">

## 安装axios
本项目使用[axios](https://github.com/axios/axios)（基于 promise 的 HTTP 库）来做网络请求。
``` bash
npm install axios -S
```
创建`src/utils/request.js`文件，后续我们将对request请求进行统一封装。

## 安装mockjs
为了方便调试，本项目使用[mockjs](http://mockjs.com/)来拦截请求，生成模拟数据并返回给前端页面。
```
npm install mockjs -S
```
创建`src/mock/index.js`文件，用于模拟后台返回数据。

## 其他修改
### 1. 修改eslint
项目默认使用了[eslint](http://eslint.cn/docs/rules/)检测规则，有些规则可能跟我们的编程习惯不一样，这会让我们的项目无法运行。我们可以通过修改`.eslintrc.js`文件来修改检测规则。
  - 取消强制驼峰命名：个人喜欢下划线命名方式，所以取消了驼峰命名检测：rules.camelcase: 'off'
``` js {6}
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'camelcase': 'off'
  }
```
### 2. 目录结构
创建以下目录：
 - `src/api`：用于编写后台请求js
 - `src/assets/css`：用于存放公共css文件
 - `src/assets/js`：用于存放公共js文件
 - `src/assets/img`：用于存放公共图片
 - `src/mock`：用于编写模拟后台数据
 - `src/utils`：用于存放公共工具文件
整体目录结构如下：
``` {6,8,9,10,12,15}
vue-llplatform
|— build         // 构建脚本
|— config        // 构建环境变量配置
|— node_modules  // npm依赖包
|— src           // 项目代码
|  |— api        // 后台请求接口
|  |— assets     // 资源文件
|  |  |— css
|  |  |— js
|  |  └─ img
|  |— components // 自定义vue组件
|  |— mock       // 模拟后台数据
|  |— pages      // 页面
|  |— router     // 路由规则
|  |— utils      // 公共工具
|  |— App.vue
|  └─ main.js
|— static
|— test           // 项目测试相关
|— .babelrc
|— .editorconfig
|— .eslintignore
|— .eslintrc.js
|— .gitignore
|— .postcssrc.js
|— index.html      // 首页入口
|— package.json    // webpack配置
└─ README.md
```