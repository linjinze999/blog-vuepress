# 错误页面
本章节介绍统一错误页面的编写。

当用户输入未知的URL时，我们希望系统能跳转至指定的404页面。另外基于我们的权限控制设置，用户在没有权限访问页面时也需要跳转至指定页面。

## 401
本文介绍如何从零开始搭建一个基于vue、element的管理平台。

## 404
1. [Vue + ElementUI 手撸后台管理网站基本框架](https://blog.csdn.net/harsima/article/details/77949609)

## 路由配置
修改`src/router/staticRouter.js`
``` js {3-5,23-32}
import AppLogin from '@/pages/main/AppLogin'
import AppRegister from '@/pages/main/AppRegister'
import AppIndex from '@/pages/main/AppIndex'
import AppError401 from '@/pages/main/AppError401'
import AppError404 from '@/pages/main/AppError404'

/* 静态页面路由 */
const staticRouter = [
  {
    path: '/',
    redirect: '/index'
  }, {
    path: '/login',
    name: '登录',
    component: AppLogin
  }, {
    path: '/register',
    name: '注册',
    component: AppRegister
  }, {
    path: '/index',
    name: '首页',
    component: AppIndex
  }, {
    path: '/error/401',
    name: '401',
    component: AppError401
  }, {
    path: '*',
    name: '404',
    component: AppError404
  }
]

export default staticRouter
```