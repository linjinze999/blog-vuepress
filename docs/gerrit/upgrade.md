# 系统升级

系统升级前请查看好[新版本特性](/gerrit/extend.html#版本历史)，注意新特性对使用的影响。升级前需对系统做好备份。

## 升级准备
1. java版本：查看新版本的release_notes，有时需要升级本地Java，如java7=>java8：
```
sudo apt-get install oracle-java8-installer
sudo update-java-alternatives -s java-8-oracle
```
2. 下载新版本war包到`/home/gerrit/gerrit-x.xx.xx.war`：见[【系统部署-下载war包】](/gerrit/deploy.html#下载war包)
3. 下载新的lib依赖包到`$site_path/lib_new`下：可以到此网站搜索要升级的依赖包，如mysql驱动jdbc等，[http://mvnrepository.com/](http://mvnrepository.com/)
4. 下载新版本插件（大版本对应即可）到`$site_path/plugins_new`下：[https://gerrit-ci.gerritforge.com/](https://gerrit-ci.gerritforge.com/)
::: warning 注意
插件网址不太稳定，有时会访问失败，几分钟后重新访问即可。
:::

## 系统备份
为了防止升级失败，造成不可挽回的数据丢失，需先备份系统，以便后续可以回退。
1. 停止系统：`$site_path/bin/gerrit.sh stop`
2. 备份数据库（若使用其他数据库，mysql为例）：`cd /home/gerrit && mysqldump -uroot -ppassword reviewdb > reviewdb.sql`
3. 备份数据目录：`cp -rf /home/gerrit/review_site /home/gerrit/review_site_bac`

**备注：** 可以通过以上命令统一备份，也可以指定目录备份，除了cache、logs、static、tmp、git目录可以不备份，其他目录bin、**data**、(**db**)、**etc**、**index**、lib、plugins、static需备份。
  - bin目录：启动相关的文件，也可以通过旧的war包init后得到，但**建议备份**。
  - cache目录：存储了系统运行时的一些缓存数据，如`git diff`的数据等，空目录也可，**可以不备份**。
  - data目录：插件可能会存储数据在此处，因此**必须备份**。
  - **db目录**：若使用系统默认数据库，则数据库数据会存储在这里，若自定义数据库，则没有此目录，因此若有此目录则**必须备份**。
  - **etc目录**：系统配置文件，系统升级有时会改动，**必须备份**。
  - git库：用于存储git库，可能文件较大，系统升级不会修改git库，因此可以不备份，但若数据不大，仍然**建议备份**。
  - **index目录**：记录了所有索引，如change、user、group，系统升级会重建索引，因此**必须备份**。
  - lib目录：三方依赖文件，也可以自己重新下载，但**建议备份**。
  - logs目录：记录系统日志，**可以不备份。**
  - plugins目录：插件，也可以自己重新下载，但**建议备份**。
  - static目录：存储一些静态文件，**可以不备份**。
  - tmp目录：系统启动每次都会生成新的临时插件、js、css文件，**可以不备份**。
  - 其他目录：若有其他插件生成的目录，则**建议备份**。

## 升级步骤
1. 停止系统：`$site_path/bin/gerrit.sh stop`
2. 更换lib依赖包和plugins插件（以下命令会移除原文件，请先备份）：
```
cd $site_path
rm -rf lib && mv lib_new lib
rm -rf plugins && mv plugins_new plugins
```
3. 升级系统：`cd /home/gerrit && java -jar gerrit-2.14.9.war init -d review_site`

按提示输入新配置参数，大部分回车使用旧配置即可，其中安装插件可以选择【y】（假如你下载不到系统默认的插件），清除缓存文件也可以选择【y】，执行数据库修改操作也选择【y】。初始化根据旧系统数据的大小，花费时间几分钟到几十分钟不等（如800G的git库大概花了40分钟）

::: tip 备注
你也可以加入`--batch`参数使用默认配置（即`etc/gerrit.config`的配置）初始化：`cd /home/gerrit && java -jar gerrit-2.14.9.war init --batch -d review_site`
:::

4. 重建索引：`cd /home/gerrit && java -jar -Xmx24g review_site/bin/gerrit.war reindex -d review_site >reindex.log 2>&1`

重建索引可能需要较大内存，因此指定`-Xmx24g`，你可以参考`$site_path/etc/gerrit.config`里`container.heapLimit`的值。另外，重建索引过程中可能出错，因此将输出重定向到`/home/gerrit/reindex.log`方便查看，防止丢失。

重建索引根据旧系统数据的大小，花费时间几十分钟到几小时不等（如几十万的change提交大概花了3小时）

5. 启动系统：`$site_path/bin/gerrit.sh start`

::: danger 错误
当你在维护系统的过程中，直接改动了后台数据，如手动删除了某个git库的文件夹，或者丢失了某个commit等，重建索引过程中就会出错，系统无法再启动，具体错误日志可以参见`/home/gerrit/reindex.log`。

你可以手动修改`$site_path/index/gerrit_index.config`文件中的`false`为`true`，这样就可以忽略错误启动系统，但错误仍然存在，异常库数据会丢失。因此建议在备份服务器上先验证是否有误，解决完问题后再进行升级。
:::


## 系统回滚
若系统升级失败，可以使用备份的数据回滚系统
1. 回滚数据库（若你使用指定数据库，mysql为例）：`cd /home/gerrit && mysql -ugerrit -ppassword reviewdb < reviewdb.sql`
2. 回滚文件：`cd /home/gerrit && rm -rf review_site && mv review_site_bac review_site`

::: warning 警告
该命令会移除`review_site`目录，使用整个备份目录`review_site_bac`替代。若你指定了目录备份，则请【**逐个恢复**】。其中cache、tmp目录可以直接清空内容；logs、static目录可以不用动；bin、data、（db）、etc、index、lib、plugins或其他插件目录需要清空目录并将原来的数据复制过来。
:::
