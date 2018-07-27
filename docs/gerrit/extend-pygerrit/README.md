---
sidebar: auto
prev: /gerrit/extend.html#restapi
next: false
---

# pygerrit

::: tip 提示
开发环境：python2.7， `sudo pip install pygerrit`
:::

## 说明
1. 修改config的用户、密码、gerrit地址，其中密码为系统个人设置中生成的http_password。
2. 封装了几个简单的常用的查看、创建项目、分支函数。
3. 注意在请求时，项目或分支中的`/`要替换为`%2F`。

## 代码
``` python
# -*- coding:utf-8 -*-
from requests.auth import HTTPBasicAuth
from pygerrit.rest import GerritRestAPI


class Gerrit():
    def __init__(self):
        config = {
            "auth_name": "xxxxxxxx",
            "auth_password": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "web_url": "http://localhost:8080/gerrit"
        }
        auth = HTTPBasicAuth(config["auth_name"], config["auth_password"])
        rest = GerritRestAPI(url=config["web_url"], auth=auth)
        self.rest = rest

    def get_project(self, project_name):
        '''
        获取项目信息
        https://gerrit.wikimedia.org/r/Documentation/rest-api-projects.html#get-project
        :param project_name: 项目名，如"demo/test"
        :return:
        1. 项目存在：
         {
            "id": "plugins%2Freplication",
            "name": "plugins/replication",
            "parent": "Public-Plugins",
            "description": "Copies to other servers using the Git protocol",
            "state": "ACTIVE"
         }
         2. 项目不存在：None
        '''
        try:
            return self.rest.get("/projects/" + project_name.replace("/", "%2F"))
        except Exception, e:
            return None

    def get_branch(self, project_name, branch_name):
        '''
        获取项目的分支信息
        https://gerrit.wikimedia.org/r/Documentation/rest-api-projects.html#get-branch
        :param project_name:项目名，如"demo/test"
        :param branch_name:分支名，如"public/master"
        :return:
        1. 项目和分支都存在：
        {
            "ref": "refs/heads/public/master",
            "revision": "67eb453396383c6777035edferwed664009e2aa5c"
        }
        2. 项目或分支不存在：None
        '''
        try:
            return self.rest.get("/projects/" + project_name.replace("/", "%2F") + "/branches/" +
                                 branch_name.replace("/", "%2F"))
        except Exception, e:
            return None

    def get_tag(self, project_name, tag_name):
        '''
        获取项目的tag信息
        https://gerrit.wikimedia.org/r/Documentation/rest-api-projects.html#get-tag
        :param project_name:项目名，如"demo/test"
        :param tag_name:tag名，如"V1.10"
        :return:
        1. 项目和tag都存在：
        {
            "ref": "refs/tags/v1.0",
            "revision": "49ce77fdcfd339843rt5wertfwe325fd52d666",
            "object": "1624f5af8ae89rfewrtw4trtwe413e3dcf30",
            "message": "Annotated tag",
            "tagger": {
              "name": "David Pursehouse",
              "email": "david.pursehouse@sonymobile.com",
              "date": "2014-10-06 07:35:03.000000000",
              "tz": 540
            }
        }
        2. 项目或tag不存在：None
        '''
        try:
            return self.rest.get("/projects/" + project_name.replace("/", "%2F") + "/tags/" +
                                 tag_name.replace("/", "%2F"))
        except Exception, e:
            return None

    def create_project(self, project_name, description, branches):
        '''
        自动创建项目
        https://gerrit.wikimedia.org/r/Documentation/rest-api-projects.html#create-project
        :param project_name:项目名，如"demo/test"
        :param description: 项目描述，如"用于自动创建项目测试"
        :param branches: 初始分支名列表，如["master", "dev"]
        :return: {
            name: name
            success: True/ False
            reponse: {
                "description": "用于自动创建项目测试",
                "state": "ACTIVE",
                "id": "mytest%2Fhello",
                "parent": "All-Projects",
                "name": "mytest/hello"
            }
        }
        '''
        result = {"name": project_name}
        # 处理带空格异常
        new_branches = []
        for branch in branches:
            new_branches.append(branch.replace(" ", ""))
        project_name = project_name.replace(" ", "")
        # 发送建项目请求
        try:
            result["response"] = self.rest.put("/projects/" + project_name.replace("/", "%2F"),
                                               json={
                                                   "description": description,
                                                   "submit_type": "REBASE_IF_NECESSARY",
                                                   "create_empty_commit": True,
                                                   "branches": new_branches
                                               })
            result["success"] = True
        except Exception, e:
            result["success"] = False
            result["response"] = str(e)
        return result

    def create_branch_by_commit_id(self, project_name, branch_name, commit_id):
        '''
        根据某commit_id自动创建新分支
        https://gerrit.wikimedia.org/r/Documentation/rest-api-projects.html#create-branch
        :param project_name: 项目名，如"demo/test"
        :param branch_name: 新分支名，如"develop"
        :param commit_id: 基于什么commit_id创建新分支，如"816df193cewrq4rt21340d6173a35a035ae544f"
        :return: {
            "name":"demo/test",
            "branch_name":"develop",
            "success" : True/ False,
            "commit_id": "816df193cewrq4rt21340d6173a35a035ae544f",
            "response":{
                "ref": "refs/heads/develop",
                "can_delete": true,
                "revision": "816df193cewrq4rt21340d6173a35a035ae544f"
            }
        }
        '''
        # 处理带空格异常
        branch_name = branch_name.replace(" ", "")
        project_name = project_name.replace(" ", "")
        result = {"name": project_name, "branch_name": branch_name, "commit_id": commit_id}
        # 发送建分支请求
        try:
            result["response"] = self.rest.put(
                "/projects/" + project_name.replace("/", "%2F") + "/branches/" +
                branch_name.replace("/", "%2F"), json={"revision": commit_id})
            result["success"] = True
        except Exception, e:
            result["success"] = False
            result["response"] = str(e)
        return result

```