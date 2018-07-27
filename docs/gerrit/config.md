# 系统配置

本章讲述的是`review_site/etc/xxx.config`的配置内容。该目录下配置了系统运行的各种参数，系统重启将会生效。

配置文件采用HJSON格式，这也是git配置文件采用的格式，因此你可以很方便的在`shell`中使用`git config`命令来设置值，如：`git config -f "./gerrit.config" database.type "mysql"`，当然平时使用文本编辑器来修改配置值即可。文件格式大体如：

``` hjson
[gerrit]
        basePath = git
        canonicalWebUrl = http://localhost:8080/gerrit/
[database]
        type = mysql
        hostname = localhost
        database = reviewdb
        username = gerrit
```

## 系统配置
系统配置项记录在`review_site/etc/gerrit.config`文件中，该文件也可用于配置插件参数。

各参数配置含义**暂时**见：【你的系统】->【Documentation】->【Table of Contents】->【System Settings】，或网上[别人的系统文档](http://gerrit.aokp.co/Documentation/config-gerrit.html)



## 插件配置
