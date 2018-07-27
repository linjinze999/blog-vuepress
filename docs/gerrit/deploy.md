# 系统部署

::: warning 注意事项
操作系统： Linux。 请提前更新镜像源：`sudo apt-get update`。
:::

## 安装环境

可通过`apt-get`命令安装所有软件：
``` bash
sudo apt-get install oracle-java8-install curl dirmngr git gitweb gnupg libcgi-pm-perl netcat procmail openssh-client wget
```

创建gerrit用户（默认创建`/home/gerrit`用户目录）
``` bash
sudo adduser gerrit 
```

## 下载war包
将下载的war包拷贝至`/home/gerrit/gerrit-x.xx.xx.war`

#### 国内下载
你可以在以下网址查看所有gerrit版本：[https://gerrit-releases.storage.googleapis.com/](https://gerrit-releases.storage.googleapis.com/)

（**注意**：打开是一个xml）

选择你要下载的版本，在网址后添加`gerrit-${GERRIT_VERSION}.war`即可下载，如：

`gerrit-2.14.9.war`下载地址为：[https://gerrit-releases.storage.googleapis.com/gerrit-2.14.9.war](https://gerrit-releases.storage.googleapis.com/gerrit-2.14.9.war)

#### 官网下载
进入官网下载：[https://www.gerritcodereview.com/](https://www.gerritcodereview.com/)
::: warning 注意
官网是外国网站，需要翻墙才能访问。
:::

## 安装系统

### 安装数据库

若使用系统默认的h2数据库，则无需安装。这里我们改为使用mysql数据库，因此需要安装mysql服务。
``` bash
sudo apt-get install mysql-server
sudo apt-get install mysql-client
sudo apt-get install libmysqlclient-dev
```
安装完以后，进入mysql创建gerrit数据库：
```
# mysql -uroot -p
mysql> CREATE USER 'gerrit2'@'localhost' IDENTIFIED BY 'password';
mysql> CREATE DATABASE reviewdb DEFAULT CHARACTER SET 'utf8';
mysql> GRANT ALL ON reviewdb.* TO 'gerrit2'@'localhost';
mysql> FLUSH PRIVILEGES;
```

### 安装系统

``` bash
java -jar /home/gerrit/gerrit-2.14.9.war init -d /home/gerrit/review_site
```

::: tip 提示
以上初始化方式需自己指定配置，若想使用默认配置，则可以加入`--batch`参数，如：

`java -jar /home/gerrit/gerrit-2.14.9.war init --batch -d /home/gerrit/review_site`
:::

按照提示输入初始化参数：

``` bash{14,18,24,55,84}
*** Gerrit Code Review 2.14.9
*** 

Create '/home/gerrit/review_site' [Y/n]? （找不到初始化目录，询问是否创建，直接回车确认即可）

*** Git Repositories
*** 

Location of Git repositories   [git]: （本地git目录地址，直接回车确认即可）

*** SQL Database
*** 

Database server type           [h2]: mysql（指定数据库，默认为h2，改为mysql）

Gerrit Code Review is not shipped with MySQL Connector/J 5.1.41
**  This library is required for your configuration. **
Download and install it now [Y/n]? y（下载mysql数据库驱动，选择是；
也可以选择否，后续自己下载对应版本的jdbc驱动拷贝至【review_site/lib】目录下，
下载地址：http://central.maven.org/maven2/mysql/mysql-connector-java）
Server hostname                [localhost]: （mysql地址，直接回车确认即可）
Server port                    [(mysql default)]: （mysql端口，直接回车确认即可）
Database name                  [reviewdb]: （数据库名，直接回车确认即可）
Database username              [xxxxxx]: gerrit（数据库用户名，改为：gerrit）
gerrit's password              : （输入数据库密码）
              confirm password : （重复输入数据库密码）

*** Index
*** 

Type                           [lucene/?]: （索引类型，直接回车确认即可）

*** User Authentication
*** 

Authentication method          [openid/?]: （登录类型，直接回车确认即可）
Enable signed push support     [y/N]? （直接回车确认即可）

*** Review Labels
*** 

Install Verified label         [y/N]? （直接回车确认即可）

*** Email Delivery
*** 

SMTP server hostname           [localhost]: （邮箱信息，直接回车确认即可）
SMTP server port               [(default)]: （直接回车确认即可）
SMTP encryption                [none/?]: （直接回车确认即可）
SMTP username                  : 

*** Container Process
*** 

Run as                         [xxxx]: gerrit （以gerrit用户运行）
Java runtime                   [/usr/lib/jvm/java-8-oracle/jre]: （java_home，直接回车确认即可）
Copy gerrit-2.14.9.war to /home/gerrit/review_site/bin/gerrit.war [Y/n]? （直接回车确认即可）
Copying gerrit-2.14.9.war to /home/gerrit/review_site2/bin/gerrit.war

*** SSH Daemon
*** 

Listen on address              [*]: （直接回车确认即可）
Listen on port                 [29418]: （直接回车确认即可）
Generating SSH host key ... rsa... dsa... ed25519... ecdsa 256... ecdsa 384... ecdsa 521... done

*** HTTP Daemon
*** 

Behind reverse proxy           [y/N]? （直接回车确认即可）
Use SSL (https://)             [y/N]? （直接回车确认即可）
Listen on address              [*]: （直接回车确认即可）
Listen on port                 [8080]: （直接回车确认即可）
Canonical URL                  [http://ubuntu:8080/]: （直接回车确认即可）

*** Cache
*** 


*** Plugins
*** 

Installing plugins.
（是否安装插件，选择：【y】，这些插件是系统必需的）
Install plugin commit-message-length-validator version v2.14.9 [y/N]? y
Install plugin download-commands version v2.14.9 [y/N]? y
Install plugin hooks version v2.14.9 [y/N]? y
Install plugin replication version v2.14.9 [y/N]? y
Install plugin reviewnotes version v2.14.9 [y/N]? y
Install plugin singleusergroup version v2.14.9 [y/N]? y
Initializing plugins.
```
::: danger 错误
若初始化出现问题，可以重复执行`init`命令，重新配置。
:::

初始化后，`/home/gerrit/review_site/etc/gerrit.config`配置如下：

``` hjson{16}
[gerrit]
	basePath = git
	serverId = dbd2d673-51c7-4542-8e88-5f28c0537589
	canonicalWebUrl = http://localhost:8080/
[database]
	type = mysql
	hostname = localhost
	database = reviewdb
	username = gerrit
[download]
        scheme = ssh
[index]
	type = LUCENE
[auth]
	type = OPENID
#   用户登录方式，调试时可以修改为以下配置，线上不可使用
#   type = development_become_any_account
[receive]
	enableSignedPush = false
[sendemail]
	smtpServer = localhost
[container]
	user = gerrit
	javaHome = /usr/lib/jvm/java-8-oracle/jre
[sshd]
	listenAddress = *:29418
[httpd]
	listenUrl = http://*:8080/
[cache]
	directory = cache
```

配置文件参数，请参考 [配置文件](./deploy.md)。可以自己手动修改配置，然后重启系统：
``` bash
/home/gerrit/review_site/bin/gerrit.sh restart
```

## 域名配置
暂时见：【你的系统】->【Documentation】->【Table of Contents】->【
Reverse Proxy】，或网上[别人的系统文档](http://gerrit.aokp.co/Documentation/config-reverseproxy.html)
