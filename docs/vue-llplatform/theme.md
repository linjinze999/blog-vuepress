# 主题定制
本章节介绍如何定制系统主题。

> 正常各个系统都有自己的设计风格，使用组件库默认的色彩风格可能与系统并不搭配，此时就需要定制化我们的主题。
> 
> 并且有时候为了满足用户的个性化需求，我们还会支持主题切换，但正常情况下不会特别提供此功能。


主题定制有多种理解方式：
## 一、不同皮肤切换
提供完全不同的皮肤给用户使用，这需要我们提取style样式，形成多套皮肤，动态加载。请参考[vue vue-cli 应用 实现换肤功能 主题切换](https://blog.csdn.net/qq_35319282/article/details/79483931)

示例：

<img src="/assets/img/vue-llplatform/theme-skin-demo1.png" width="49%"/>
<img src="/assets/img/vue-llplatform/theme-skin-demo2.png" width="49%"/>

## 二、指定主题色
更换组件库的默认主题色，此方式只是修改了一下组件的色彩样式，我们只要引入指定的样式文件即可（参考[Element 自定义主题](http://element.eleme.io/#/zh-CN/component/custom-theme)），如：
``` js {4}
import ElementUI from 'element-ui'
// 默认样式改为指定样式
// import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'
```

**定制化的样式文件有以下几种办法生成：**

### 一）在线生成
访问[Element在线主题生成工具](https://elementui.github.io/theme-chalk-preview)，选择自己所需的颜色，下载主题压缩包，解压到系统中，按如下方式引入系统：
``` js
import Vue from 'vue'
import Element from 'element-ui'
import '../theme/index.css'

Vue.use(Element)
```

### 二）直接修改 SCSS 变量
新建文件`element-variables.scss`
``` scss
/* 改变主题色变量 */
$--color-primary: teal;

/* 改变 icon 字体路径变量，必需 */
$--font-path: '~element-ui/lib/theme-chalk/fonts';

@import "~element-ui/packages/theme-chalk/src/index";
```
之后，在项目的入口文件`src/main.js`中，直接引入以上样式文件即可（无需引入 Element 编译好的 CSS 文件，因为已经 import 了）：
``` js
import Vue from 'vue'
import Element from 'element-ui'
import './element-variables.scss'

Vue.use(Element)
```

### 三）使用Element的命令行主题工具
**1. 安装工具**

a) 首先安装「主题生成工具」，可以全局安装或者安装在当前项目下，推荐安装在项目里，方便别人 clone 项目时能直接安装依赖并启动，这里以全局安装做演示。
``` bash
npm i element-theme -g
```
b) 安装白垩主题，可以从 npm 安装或者从 GitHub 拉取最新代码。
``` bash
# 从 npm
npm i element-theme-chalk -D

# 从 GitHub
npm i https://github.com/ElementUI/theme-chalk -D
```

**2. 初始化变量文件**

主题生成工具安装成功后，如果全局安装可以在命令行里通过`et`调用工具，如果安装在当前目录下，需要通过`node_modules/.bin/et`访问到命令。执行`-i`初始化变量文件。默认输出到`element-variables.scss`，当然你可以传参数指定文件输出目录。
``` bash
et -i [可以自定义变量文件]

> ✔ Generator variables file
```
如果使用默认配置，执行后当前目录会有一个 element-variables.scss 文件。内部包含了主题所用到的所有变量，它们使用 SCSS 的格式定义。大致结构如下：
``` scss
$--color-primary: #409EFF !default;
$--color-primary-light-1: mix($--color-white, $--color-primary, 10%) !default; /* 53a8ff */
$--color-primary-light-2: mix($--color-white, $--color-primary, 20%) !default; /* 66b1ff */
$--color-primary-light-3: mix($--color-white, $--color-primary, 30%) !default; /* 79bbff */
$--color-primary-light-4: mix($--color-white, $--color-primary, 40%) !default; /* 8cc5ff */
$--color-primary-light-5: mix($--color-white, $--color-primary, 50%) !default; /* a0cfff */
$--color-primary-light-6: mix($--color-white, $--color-primary, 60%) !default; /* b3d8ff */
$--color-primary-light-7: mix($--color-white, $--color-primary, 70%) !default; /* c6e2ff */
$--color-primary-light-8: mix($--color-white, $--color-primary, 80%) !default; /* d9ecff */
$--color-primary-light-9: mix($--color-white, $--color-primary, 90%) !default; /* ecf5ff */

$--color-success: #67c23a !default;
$--color-warning: #e6a23c !default;
$--color-danger: #f56c6c !default;
$--color-info: #909399 !default;

...
```

**3. 修改变量**

直接编辑`element-variables.scss`文件，例如修改主题色为红色。
```scss
$--color-primary: red;
```

**4. 编译主题**

保存文件后，到命令行里执行`et`编译主题，如果你想启用`watch`模式，实时编译主题，增加`-w`参数；如果你在初始化时指定了自定义变量文件，则需要增加`-c`参数，并带上你的变量文件名
``` bash
et

> ✔ build theme font
> ✔ build element theme
```

**5. 引入自定义主题**

默认情况下编译的主题目录是放在`./theme`下，你可以通过`-o`参数指定打包目录。像引入默认主题一样，在代码里直接引用`theme/index.css` 文件即可。
``` js
import '../theme/index.css'
import ElementUI from 'element-ui'
import Vue from 'vue'

Vue.use(ElementUI)
```

## 三、主题色切换
提供多种主题颜色，用户自选

## 四、自定义主题色
用户可以自定义主题颜色

Element官方实现了一个demo：[在线主题生成工具](https://elementui.github.io/theme-chalk-preview)



作者在[issue](https://github.com/ElemeFE/element/issues/3054)中回复了他的方案：
1. 先把默认主题文件中涉及到颜色的 CSS 值替换成关键词：[源码](https://github.com/ElementUI/theme-preview/blob/master/src/app.vue#L250-L274)
2. 根据用户选择的主题色生成一系列对应的颜色值：[源码](https://github.com/ElementUI/theme-preview/blob/master/src/utils/formula.json)
3. 把关键词再换回刚刚生成的相应的颜色值：[源码](https://github.com/ElementUI/theme-preview/blob/master/src/utils/color.js)
4. 直接在页面上加 style 标签，把生成的样式填进去[源码](https://github.com/ElementUI/theme-preview/blob/master/src/app.vue#L198-L211)


