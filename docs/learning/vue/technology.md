---
sidebarDepth: 1
---
# Vue技术框架
本章节介绍了Vue项目可能用到的一些技术框架，帮助初学者更好的了解相关技术。
## 目录结构
以下是常见的一种项目目录结构（根据vue-cli3初始化后的项目结构修改），后续将讲解相关的技术：
```
Demo
|— dist                 // 构建产物
|— node_modules         // npm依赖包
|— public               // 第三方不打包资源
|— src                  // 源代码
|   |— api              // 接口处理（自行创建）
|   |— assets           // 资源文件
|   |— components       // 全局公用组件
|   |— router           // 路由规则（原文件router.js，建立文件夹管理）
|   |— store            // 状态管理（原文件store.js，建立文件夹管理）
|   |— views            // 所有视图页面
|   |— utils            // 公共工具（自行创建）
|   |— App.vue          // 入口页面
|   └─ main.js          // 入口 加载组件 初始化等
|— tests                // 自动化测试
|— .browserslistrc      //浏览器兼容配置
|— .editorconfig        //编辑器风格配置
|— .env.development     //开发环境变量配置（自行创建）
|— .env.production      //生产环境变量配置（自行创建）
|— .eslintrc.js         //ESLint规则配置
|— .gitignore           //git忽略配置
|— babel.config.js      //babel配置
|— package.json         //npm配置
|— package-lock.json    //npm依赖包锁定
|— postcss.config.js    //webpack的css-loader配置
|— vue.config.js        //vue-cli配置（自行创建）
└─ README.md            //项目简介
```

## 基础技术
### 1. 打包工具
打包工具可以帮助我们组织代码、优化项目、压缩产物等。目前较流行的就是[webpack](https://www.webpackjs.com/)，你需要好好阅读其[概念](https://www.webpackjs.com/concepts/)和[指南](https://www.webpackjs.com/guides/)，这有助于你理解前端项目是如何管理组织的。

### 2. 包管理工具
前端流行的包管理工具有[npm](https://www.npmjs.com/)、[yarn](https://yarn.bootcss.com/)。  
- npm是官方管理工具；
- yarn是Facebook、Google等公司推出，对旧版本的npm问题进行优化的工具，如安装速度、更好的语义化、统一版本保证等，但随着npm5的发布，对以上问题进行了优化，优势已不明显。
 
具体可以参考[npm和yarn的区别，我们该如何选择?](https://www.jianshu.com/p/254794d5e741)

### 3. Javascript支持
#### 3.1 Javascript
Javascript有ES5、ES6等语法，项目可选择目前较通用的[ES6](http://es6.ruanyifeng.com/)。若需要对低浏览器进行适配，可通过[babel](https://www.babeljs.cn/)来[兼容各浏览器](https://cli.vuejs.org/zh/guide/browser-compatibility.html)，配置方法可参考[browserslist 目标浏览器配置表](https://www.jianshu.com/p/bd9cb7861b85)，默认配置为：
``` js
> 1%  // 全球超过1%人使用的浏览器
last 2 versions // 所有浏览器兼容到最后两个版本，根据CanIUse.com追踪的版本
not ie <= 8  // 排除ie9以下版本
```
::: tip 提示
在vue-cli3项目中，你可以随意选择语法，默认情况下vue会根据源代码中出现的语言特性自动检测需要的 polyfill。但通常如无必要，建议使用ES6等统一语法（除非你真的需要某种新特性）。
:::
#### 3.2 TypeScript
[TypeScript](https://www.tslang.cn/)是Javascript的超集，它解决了ES5之前的一些语法问题，随着ES6的发布，TypeScript基本只剩数据强类型的优点。强类型数据在大型网站性能优化与数据形态上更优，你可以考虑要不要在vue中[支持TypeScript](https://cn.vuejs.org/v2/guide/typescript.html)。
::: tip 提示
vue2对TypeScript的支持不算友好，在 Vue 的下一个大版本 (3.x) 中计划了相当多的 TypeScript 支持改进，包括内置的基于 class 的组件 API 和 TSX 的支持。
:::

### 4. CSS支持
原生的css有时候写起来并不友好，如不支持参数等。于是有了[sass](http://sass.bootcss.com/)、[less](http://lesscss.cn/)这些扩展语言。sass和less可以使样式编写更加灵活、方便，它们有以下共性：
- 混合（Mixins）：class中的class;
- 参数混合（Parametric）：可以像函数一样传递参数的class;
- 嵌套规则（Nested Rules）：class中嵌套class，从而减少重复的代码；
- 运算（Operations）：css中的数学计算；
- 颜色功能（Color function）：可以编辑你的颜色；
- 命名空间（Namespaces）：样式分组，从而方便被调用；
- 作用域（Scope）：局部修改样式；
- JavaScript表达式(Javascript evaluation)：在CSS样式中使用Javascript表达式赋值。

LESS和Sass之间的主要区别是他们的实现方式不同。LESS是基于JavaScript运行,所以LESS是在客户端处理；而Sass是基于Ruby的，是在服务器端处理的。具体可以参考[Less介绍及其与Sass的差异](https://www.w3cplus.com/css/an-introduction-to-less-and-comparison-to-sass.html)

### 5. 代码规范检测
统一的代码规范可以提高项目的可维护性。引入[ESLint](https://palantir.github.io/tslint/)可以自动检测代码是否符合某一套规范。在vue-cli3中，提供以下代码规范可供选择：
- 只打印error
- [Airbnb编程规范](https://www.html.cn/archives/8345)：互联网上最受欢迎的 JavaScript 编码规范之一。 它几乎涵盖了 JavaScript 的各个方面。
- [Standard编程规范](https://standardjs.com/#the-rules)：一份强大的 JavaScript 编码规范，被很多知名公司所采用，比如 NPM、GitHub、mongoDB 和 ZenDesk 等。
- [Prettier](https://github.com/prettier/prettier)：可以自动格式化的一套代码规范。
::: tip 提示
在vue-cli项目项目中，你可以配置每次保存文件都会检测规范，规范错误无法编译通过；commit之前必需解决规范错误
:::

### 6. Mock数据
开发过程中，我们经常需要模拟后台返回数据。你可以使用[mockjs](http://mockjs.com/)来实现数据模拟。   
它的原理是重写`XMLHttpRequest`，对于我们需要拦截的接口返回模拟的数据，其他接口则正常请求。

### 7. PWA
PWA全称Progressive Web App，即为渐进式WEB应用。一个 PWA 应用首先是一个网页, 可以通过 Web 技术编写出一个网页应用. 随后添加上 App Manifest 和 Service Worker 来实现 PWA 的安装和离线等功能。其解决了以下3个问题：
1. 可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏；
2. 实现离线缓存功能，即使用户没有网络，依然可以使用一些离线功能；
3. 实现了消息推送。
::: warning 注意
使用PWA会额外带来开发量。
:::

## VUE相关技术
### 1. Vue-CLI
[Vue CLI](https://cli.vuejs.org/zh/)是一个基于 Vue.js 进行快速开发的完整系统，提供：

- 通过 @vue/cli 搭建交互式的项目脚手架。
- 通过 @vue/cli + @vue/cli-service-global 快速开始零配置原型开发。
- 一个运行时依赖 (@vue/cli-service)，该依赖：
  - 可升级；
  - 基于 webpack 构建，并带有合理的默认配置；
  - 可以通过项目内的配置文件进行配置；
  - 可以通过插件进行扩展。
- 一个丰富的官方插件集合，集成了前端生态中最好的工具。
- 一套完全图形化的创建和管理 Vue.js 项目的用户界面。

Vue CLI 致力于将 Vue 生态中的工具基础标准化。它确保了各种构建工具能够基于智能的默认配置即可平稳衔接，这样你可以专注在撰写应用上，而不必花好几天去纠结配置的问题。与此同时，它也为每个工具提供了调整配置的灵活性，无需 eject。

### 2. Vue-Router
[Vue Router](https://router.vuejs.org/zh/)是官方提供的路由管理工具，其支持以下两种写法：
- hash：路由网址如：localhost/#/nav/index
- history：路由网址如：localhost/nav/index（浏览器需要支持html5，反向代理支持[url重定向至index.html](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)）

### 3. Vuex
[Vuex](https://vuex.vuejs.org/zh/)是官方专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

### 4. 组件库
当前Vue的组件库较流行的有：
- [Element](http://element-cn.eleme.io/#/zh-CN)：饿了么前端团队维护，成熟强大，但图标和组件丰富性没有其他两个好。
- [IView](https://www.iviewui.com/)：由 TalkingData 前端可视化团队部分成员开发维护，在Vue领域较成熟，但生态丰富性不如其他两个。
- [Ant](https://vue.ant.design/docs/vue/introduce-cn/)：阿里巴巴前端团队维护，是一门成熟的设计语言，但Vue的组件库起步比其他两个晚了2年，目前还有许多待完善的地方。

### 5. 国际化
你可以使用[vue-i18n](https://kazupon.github.io/vue-i18n/)来做国际化（中英文切换）。如果你还使用了组件库，你还需要结合组件库自带的国际化来实现全局国际化。

### 6. 自动化测试
Vue-CLI支持两种[单元测试](https://cli.vuejs.org/zh/config/#%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95)和两种[E2E测试（黑盒测试）](https://cli.vuejs.org/zh/config/#e2e-%E6%B5%8B%E8%AF%95)。你可以利用它们来做一些自动化测试，避免每次项目迭代都要手动做全功能测试。
