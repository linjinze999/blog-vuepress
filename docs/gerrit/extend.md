# 扩展

[[toc]]

## 版本历史
见官网：[https://www.gerritcodereview.com/releases/README.md](https://www.gerritcodereview.com/releases/README.md)
::: warning 警告
该网站是外国网站，需要翻墙才可查看。
:::

## 样式优化
Gerrit系统的前端是由[GWT](http://www.gwtproject.org/)(不懂可见[GWT百度百科](https://baike.baidu.com/item/GWT/6513689?fr=aladdin))生成的，因此样式较为简陋。但其提供了扩展，我们可以自定义样式。

你可以到[https://github.com/Ecwid/gerrit-css-theme](https://github.com/Ecwid/gerrit-css-theme)下载作者编写的css文件，将其放到`review_site/etc/`目录下，重启系统即可看到新的界面样式。

::: danger 备注
请删掉css文件开头中的google字体链接，否则浏览器会去加载该字体，直至失败，导致页面加载时间过久。
:::

## 插件下载
你可以到[https://gerrit-ci.gerritforge.com/](https://gerrit-ci.gerritforge.com/)下载对应大版本的最新插件，将插件拷贝到`review_site/plugins/`目录下，重启系统即可使用。

::: warning 警告
该网站一直不稳定，若无法访问，则等待几分钟再次访问即可。
:::

## RestApi

通过调用系统提供的接口，你可以在其他系统或脚本中操作gerrit，这有利于自动化的实现。

#### 工具
Python：[pygerrit](https://pypi.org/project/pygerrit/0.2.1/) 或 [pygerrit2](https://pypi.org/project/pygerrit2/)

[点此查看pygerrit代码示例](/gerrit/extend-pygerrit/)

#### 接口
系统提供的接口可见【你的系统】->【Documentation】->【REST API】，或网上[别人的系统文档](https://review.typo3.org/Documentation/rest-api.html)

## 管理员命令
系统提供的SSH命令可见【你的系统】->【Documentation】->【Table of Contents】->【SSH=>Command Line Tools】，或网上[别人的系统文档](http://gerrit.aokp.co/Documentation/cmd-index.html)

以下列出几个常用的命令：
``` bash
1. 查看ssh连接数（可用于查看有多少人在做代码拉取或推送操作，有利于判断服务器的压力）：
ssh -p 29418 review.example.com gerrit show-queue -w

2. 查看所有缓存（分析服务器缓存情况）：
ssh -p 29418 review.example.com gerrit show-caches

3. 查看可刷新缓存（更新数据）：
ssh -p 29418 review.example.com gerrit flush-caches --list

4. 刷新指定缓存——项目列表：
ssh -p 29418 review.example.com gerrit flush-caches --cache projects

5. 查看所有项目名：
ssh -p 29418 review.example.com gerrit ls-projects

6. 设置项目合并commit方式（merge->rebase）
ssh -p 29418 review.example.com gerrit set-project example --submit-type REBASE_IF_NECESSARY

7. 查询changes：
ssh -p 29418 review.example.com gerrit query --format=JSON status:open project:tools/gerrit limit:2
```

## Sonarqube代码检查
可结合[Sonarqube](https://www.sonarqube.org/)代码检查，在工程师提交代码的时候，及时地做代码质量检查，以便及时修改，增加代码的可读性与维护性，减少后期修改成本。

部署方式暂时见：[https://github.com/linjinze999/Operation/tree/master/SonarQube](https://github.com/linjinze999/Operation/tree/master/SonarQube)

## Hooks钩子
Gerrit系统支持在做代码操作时，产生相应事件，触发钩子脚本执行指定任务。如在代码入库时，触发自动化测试等。我们可以在`review_site/hooks/`目录下创建指定名字的脚本，让相应事件发生时执行指定任务，具体事件和脚本名可见[扩展-Hooks](/gerrit/extend-hooks/)

