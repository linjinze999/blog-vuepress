# 分布式部署

::: warning 需知
Gerrit分布式部署，是利用了gerrit的replication插件，实现了主从系统的搭建。其中主服务器可以用于正常的系统服务，而从服务器只能提供代码拉取服务，不可推送代码，也没有界面端。

从服务器只同步了git库的内容，没有同步index、data、db、etc等重要目录的内容，因此不适合做完整的数据备份。
:::

Gerrit 主从系统大致示意图：
```
+----------------------+                  +--------------------+
|                      |                  |                    |
|    Gerrit Master     |                  |    Gerrit Slave    |
|       Server         |                  |       Server       |
|                +-----+-----+            |                    |
|   +----------+ |  Gerrit   |            |     +----------+   |
|   |Repository| |Replication|  git push  |     |Repository|   |
|   |          +-+  Plugin   +----------------->+          |   |
|   +----------+ +-----+-----+            |     +----------+   |
|                      |                  |                    |
|   +--------------+   |                  |  +--------------+  |
|   |   PostgreSQL |   |  Replication     |  | PostgreSQL   |  |
|   |    PRIMARY   +------------------------>+ HOT-STANDBY  |  |
|   +--------------+   |                  |  +--------------+  |
+----------------------+                  +--------------------+
```
参考此文章：[搭建分布式 Gerrit 集群](https://yumminhuang.github.io/post/distributedgerrit/)


## 数据库配置
Gerrit主从系统没有强制要求另起一个数据库，因此你可以直接使用同一个数据库，毕竟从系统不用于推送代码。

安全起见，你最好搭建一个热备份的数据库。Mysql可以参考此文章：[Mysql主从同步（复制）](https://www.cnblogs.com/kylinlin/p/5258719.html)。PostgreSQL可以参考此文章：[搭建分布式 Gerrit 集群](https://yumminhuang.github.io/post/distributedgerrit/)

## 从系统配置
::: warning 需知
从系统的初始数据请完整拷贝主系统的`review_site`文件夹，修改`$site_path/etc/gerrit.config`配置文件中域名相关和数据库相关的参数即可使用。否则可能丢失用户ssh公钥等信息，影响用户拉取代码。
:::
1. 在gerrit运行的用户的`~/.ssh/authorized_keys`文件中写入主系统服务器的ssh公钥（主服务器的`~/.ssh/id_rsa.pub`内容，若没有可以用`ssh-keygen -t rsa`生成），添加用户信任，使得主节点可以直接ssh访问从节点，以便主节点可以push代码至从节点。
2. 在`etc/gerrit.config`文件中设置`container.slave=true`，以节点模式运行系统。
``` {5}
[container]
    user = gerrit
    javaHome = /usr/lib/jvm/java-7-oracle/jre
    javaOptions = -Xmx80g -Xms20g -Xmn2g
    slave = true
[database]
    type = postgresql
    database = reviewdb
    hostname = localhost
    username = gerrit2
```

## 主系统配置
1. 确认安装了【Replication】插件（`$site_path/plugins/replication.jar`包存在，理论上此插件系统会默认安装，没有的话见：[扩展-插件下载](/gerrit/extend.html#插件下载)）。
2. 编写配置文件`$site_path/etc/replication.config`：
```
[remote "slave"]
  # 远程git库的url
  url = ssh://gerrit-slave.example.com/home/gerrit/review_site/git/${name}.git
  # 完全同步（删除从系统多余的分支等）
  mirror = true
  # 线程数
  threads = 4
```
::: tip 提示
点击查看[全部replication.config配置](/gerrit/distribute-config/)
:::
3. 重启系统 或 重新加载插件生效：

服务器执行：
```
$site_path/bin/gerrit.sh restart
```
或 本地执行（确认你有管理员权限）：
```
# 从新加载插件
ssh -p 29418 gerrit-master.example.com gerrit plugin reload replication
# 启动同步任务
ssh -p 29418 gerrit-master.example.comt replication start  --all
```

## 用户配置
用户通过配置`~/.gitconfig` 文件来实现代码上传和下载分流。
```
[url "ssh://<username>@gerrit-slave.example.com:29418"]
    insteadOf = gerrit
    pushInsteadOf = ssh://<username>@gerrit-master.example.com:29418
```
这样，克隆代码库的时候使用命令
```
git clone gerrit:path/to/repo
```
可以从 Gerrit Slave 下载代码，而 git push 的时候会自动将代码 Push 到 Gerrit Master。