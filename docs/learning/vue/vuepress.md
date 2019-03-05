---
sidebarDepth: 0
---
# Vuepress
本章节介绍如何使用 [github](https://github.com/) + [vuepress](https://vuepress.vuejs.org/zh/) 搭建纯静态页面的个人博客。
::: tip 提示
面向（半）技术人员。你需要懂得：[git](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000) 、 [markdown](https://www.jianshu.com/p/191d1e21f7ed)（可以使用[markdownpad2编辑器](http://markdownpad.com/)）；若你还懂得[Vue](https://cn.vuejs.org/)，那你可以更灵活地定制你的页面。
:::

## Github
首先需要在[github](https://github.com/)网站上注册一个账号，这里以`linjinze999`为例。

`github`网站支持你在上面创建静态网站，你只要在它上面创建一个`你的名字.github.io`的git库，它便会自动为你分配`https://你的名字.github.io/`的网址，并显示你git库中`/index.html`的内容。它提供了一些初始模板，但此处我们将使用`vuepress`，因此不选择github为我们推荐的模板。

如我创建了一个`linjinze999.github.io`的git库（这里我已经创建过了，所以提示我已存在）:
<img src="/assets/img/learning/vue/vp_github_create.png" style="border: 1px solid #000;"/>

并推送了`/index.html`文件：
``` html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>林锦泽的个人博客</title>
</head>
<body>
  <h1>林锦泽的个人博客首页</h1>
</body>
</html>
```
那么加下来访问[https://linjinze999.github.io/](https://linjinze999.github.io/)网址便可看到以下内容（若没看到，可能是github网站未及时更新，可稍等几分钟）：

<img src="/assets/img/learning/vue/vp_github_home.png" style="border: 1px solid #000;"/>

## Vuepress
[Vuepress](http://caibaojian.com/vuepress/)是Vue的作者为了项目文档而写的项目，效果类似[Vue官网](https://cn.vuejs.org/)。其拥有以下特点：
- 内置 Markdown 拓展
- 在 Markdown 中使用 Vue 组件
- Vue 驱动的自定义主题系统
- 支持[PWA](https://lavas.baidu.com/pwa)
- Github链接
- 基于 Git 的 “最后更新时间”
- 多语言支持

以下介绍如何利用搭建个人博客：
### 安装依赖
全局安装依赖：`npm i -g vuepress vuepress-theme-vue`

### 代码管理
在github上创建一个`vuepress`库，用于管理个人博客的原始代码（不是`*.github.io`库），并将其克隆至本地；

### 项目初始化
1. 你可以参考[这边文章](https://segmentfault.com/a/1190000015237352)从头开始配置；
2. 也可以直接拷贝[这个项目](https://github.com/linjinze999/blog-vuepress)进行修改：
```
git clone https://github.com/linjinze999/blog-vuepress.git
```
::: warning 警告
你需要额外安装依赖`element-ui`：`npm i -g element-ui`
:::
- `scripts`目录是我为了方便部署编写的脚本，其在`package.json`中被调用，如我可以运行`npm run release`快速把代码提交入库。你需要修改所有脚本，使其指向你的仓库地址。**这里包含了将产物部署到`*.github.io`的`release`脚本**。
- `docs/.vuepress/config.js`文件是整个项目的配置文件。你需要修改`locales.title`、`themeConfig.repo`、`themeConfig.docsRepo`，以及项目菜单目录`themeConfig.locales`。具体配置含义见官网[配置参考](http://caibaojian.com/vuepress/config/)和[默认主题配置](http://caibaojian.com/vuepress/default-theme-config/)
- `docs\.vuepress\public`下存放一些logo图片，`docs\.vuepress\public\icons`下存放PWA对各个设备的支持图片，你可以根据需要进行修改。
- `docs\.vuepress\components\HomeLayout.vue`是使用`vue` + `element-ui`定制化的首页，你可以根据需求更改，或者修改`docs\README.md`来使用默认首页

效果图如下：
<img src="/assets/img/learning/vue/vp_vuepress_demo1.png" style="border: 1px solid #000;"/>
<img src="/assets/img/learning/vue/vp_vuepress_demo2.png" style="border: 1px solid #000;"/>