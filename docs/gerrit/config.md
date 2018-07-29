# 系统配置

本章讲述的是`$site_path/etc/xxx.config`的配置内容。该目录下配置了系统运行的各种参数，系统重启将会生效。

配置文件采用HJSON格式，这也是git配置文件采用的格式，因此你可以很方便的在`shell`中使用`git config`命令来设置值，如：`git config -f "./gerrit.config" database.type "mysql"`，当然平时使用文本编辑器来修改配置值即可。文件格式大体如：

``` json
[gerrit]
        basePath = git
        canonicalWebUrl = http://localhost:8080/gerrit/
[database]
        type = mysql
        hostname = localhost
        database = reviewdb
        username = gerrit
```

各参数配置含义可见：【你的系统】->【Documentation】->【Table of Contents】->【System Settings】，或网上[别人的系统文档](http://gerrit.aokp.co/Documentation/config-gerrit.html)。

## 系统配置
系统配置项记录在`$site_path/etc/gerrit.config`文件中，该文件也可用于配置插件参数。

以下示例文件配置了域名、数据库、下载命令、ldap登录、邮件、打印java日志、打印web请求日志、gitiles（需安装gitiles.jar插件）、代码合并方式改为rebase、链接识别（changeid、bugzilla、redmine、邮件）：

```
[gerrit]
        basePath = git
        canonicalWebUrl = http://www.example.com/gerrit/
        installCommitMsgHookCommand = curl -Lo .git/hooks/commit-msg www.example.com/gerrit/tools/hooks/commit-msg && chmod +x .git/hooks/commit-msg
        reportBugUrl = mailto:xxx@163.com?cc=xxx@qq.com&subject=Gerrit feedback
        reportBugText = Providing Feedback
[database]
        type = mysql
        hostname = localhost
        database = reviewdb
        username = gerrit
[download]
        command = checkout
        command = cherry_pick
        command = pull
        command = format_patch
        scheme = ssh
        scheme = repo_download
[auth]
#        type = DEVELOPMENT_BECOME_ANY_ACCOUNT
        type = LDAP
[ldap]
        server = ldap://ldap.net:389/
        groupBase = dc=groups,dc=net
        accountBase = ou=auto,ou=Users,dc=groups,dc=net
        accountBase = ou=Public,dc=groups,dc=net
        accountPattern = (&(mail=${username}))
        accountFullName = ${sn}${givenName}
        accountEmailAddress = mail
        username = cn=my_admin,ou=admin,dc=groups,dc=net
        password = xxxxxxxx
[user]
        email = xxx@163.com
[sendemail]
#        enable = false
        from = MIXED
        smtpServer = smtp.xxx.com
        smtpServerPort = 25
        smtpUser = xxx@163.com
        smtpPass = xxxxxxxxx
[container]
        user = gerrit
        javaOptions = -XX:+PrintGCDetails -XX:+PrintGCDateStamps -Xloggc:/home/gerrit/review_site/jvm_logs/gc_log -XX:CMSInitiatingOccupancyFraction=50 -XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:+CMSParallelRemarkEnabled -XX:+UseCMSCompactAtFullCollection
#        javaHome = /usr/lib/jvm/jdk1.8.0_161/jre
#        heapLimit = 24g
[sshd]
#        threads = 64
        listenAddress = *:29418
[httpd]
        requestLog = true
#        maxThreads = 32
        listenUrl = proxy-http://*:8080/gerrit/
#        maxQueued = 150
[cache]
        directory = cache
[cache "web_sessions"]
        maxAge = 1month
[receive]
        timeout = 60min
[gitweb]
        linkname = gitiles
        url = plugins/gitiles/
        revision = ${project}/+/${commit}
        project = ${project}
        branch = ${project}/+/${branch}
        filehistory = ${project}/+log/${branch}/${file}
[repository "*"]
        defaultSubmitType = REBASE_IF_NECESSARY
[commentlink "changeid"]
        match = (I[0-9a-f]{8,40})
        link = "#q,$1,n,z"
[commentlink "bugzilla"]
        match = "(([Bb]ug|[Ff]ix):?\\s+#?)(\\d+)"
        link = http://bugzilla.com:8000/show_bug.cgi?id=$3
[commentlink "redmine"]
        match = "([Ii]ssue:?\\s+#?)(\\d+)"
        link = http://xxx.net/redmine/issues/$2
[commentlink "email"]
        match = ([0-9a-z]+@163.com)
        link = mailto:$1
[commitmessage]
#        maxSubjectLength = 65
#        maxLineLength = 70
        rejectTooLong = false
[index]
        type = LUCENE
[addreviewer]
        maxAllowed = 30

```


## 保密配置
`$site_path'/etc/secure.config`配置文件将覆盖`$site_path'/etc/gerrit.config`的配置，该文件应该是只读的，用于配置密码等敏感信息。示例：
```
[auth]
  registerEmailPrivateKey = 2zHNrXE2bsoylzUqDxZp0H1cqUmjgWb6

[database]
  username = webuser
  password = s3kr3t

[ldap]
  password = l3tm3srch

[httpd]
  sslKeyPassword = g3rr1t

[sendemail]
  smtpPass = sp@m

[remote "bar"]
  password = s3kr3t
```
