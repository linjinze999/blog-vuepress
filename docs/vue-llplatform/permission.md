# 权限控制
本章节介绍如何实现前端的权限控制。
::: tip 提示
真正的权限应该由后端来控制，前端权限控制是为了更好的展示，让交互变的友好。
:::

## 权限说明
### 权限策略
前端权限策略大体分为两种：
1. 前端记录页面和权限表，后台返回用户角色，前端根据角色分配权限；
2. 前端记录页面表，后台记录权限表，用户登录时后台返回用户权限，前端根据权限表显示页面。

两种方案各有优缺点：

第一种方案：前端可以自己维护权限，不用依赖后端（想想前后端不分离时被后端支配的恐惧吧）。但是采用这种方式，每次角色的权限变更可能都需要更新代码。因此在**权限变更较不频繁**的时候可以采用这种方式。

第二种方案：可以较为方便的增删改权限。缺点权限表依赖后台，并且需要开发一个权限配置页面。在**权限变更比较频率**的时候较为适用。

**本项目采用第二种方案**。对第一种方案有兴趣的人可以参考[此文章](https://juejin.im/post/591aa14f570c35006961acac)。

### 权限层级
权限层级大体分为**接口级权限**、**页面级权限**、**数据级权限**。

其中接口级的权限（真正能实现安全的权限控制）由后端来控制，前端只需能显示后台返回的结果即可。

页面级和数据级的权限决定了前端的显示。前端可以通过路由表来实现页面级的权限控制，数据级的权限控制（如某按钮权限）可以通过代码判断（如：`v-if`）来实现。

## 接口权限控制
如上文所说，**接口级的权限**是真正能实现安全的权限控制，由后端来控制。

现在用的比较多的是[jwt ](https://www.jianshu.com/p/576dbf44b2ae)，即登录时后台返回一个token，以后前端每次调用接口都带上此token，服务器获得请求后比较token从而进行权限控制。

我们可以修改一下底层的网络请求封装`src/utils/request.js`，拦截`axios`请求，在`header`中加入`token`。若后台校验token失效，则可以约定返回**指定的错误码**，如`{success: false, error: {code: 100000}}`，那么我们需要对响应进行处理（转向登录页面）：
``` js {3-6,20-24}
/* 为每个请求设置默认baseURL，并添加token */
axios.defaults.baseURL = ''
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('user-token')
  return config
})

/* 普通请求 */
export const request = (url, params, config = {}, auto_error_res = true, auto_error_data = true) => {
  const args = Object.assign({
    'method': 'post',
    'url': url,
    'data': params
  }, config)
  return axios(args).then((res) => {
    /* 后台返回指定错误 */
    if (!res.data.success) {
      res.data.error = res.data.error || {}
      console.error(res.data.error)
      /* token失效 */
      if (res.data.error.code === '100000') {
        router.push('/login')
        return Promise.reject(res.data.error)
      }
      /* 其他错误 */
      if (auto_error_data) {
        const err_msg = res.data.error.message || '未知的服务器错误，请联系管理员！'
        const err_cod = res.data.error.code || -1
        MessageBox.alert(err_msg, '请求失败：' + err_cod, {confirmButtonText: '确定'})
      }
      return Promise.reject(res.data.error)
    }
    return res.data.result
  }, (error) => {
    /* 网络请求异常 */
    console.error(error)
    if (auto_error_res) {
      const err_status = error.response.status || -100
      MessageBox.alert('网络请求异常，请联系管理员！', '请求异常：' + err_status, {confirmButtonText: '确定'})
    }
    return Promise.reject(error)
  })
}
```
此处使用`localStorage`存储token，因此登录时需要存储一下token，假设约定后台返回格式如下：
``` js
{
  success: true,
  result: {token: 'xxxxxxxxxxxxxxxx'}
}
```
修改`src/api/user.js`：
``` js {5}
import {request} from '../utils/request'

export const requestLogin = params => {
  return request('/api/user/login', params).then(data => {
    localStorage.setItem('user-token', JSON.stringify(data.token))
    return data
  })
}
```

## 页面权限控制
上文提到本项目采用**后台记录权限表**的策略，思路大体为：登录成功后，前端继续请求获取权限表并存储（考虑到现在后端常常使用微服务，因此把token的获取和权限表的获取拆开，而不是登录后一起返回）。

当用户要访问某页面时，判断一下该页面是否在权限表中，若不在，则跳转至401（用户无权限）页面。

**备注**：记录权限表时，还要将数据级的权限数据放置到路由表中，以便页面能够根据此权限数据进行渲染。此处会利用到Vue Router的[路由元信息](https://router.vuejs.org/zh/guide/advanced/meta.html)。

### 实现
约定后台返回权限表格式，修改`src/mock/index.js`如下：
``` js {17-26}
import Mock from 'mockjs'

export default {
  mockData () {
    Mock.mock('/api/user/login', {
      'success': true,
      'result': {
        'token': 'fdsjfhjkdshfkldsajfjasdfbjsdkfhsdajfj'
      }
    })
    Mock.mock('/api/user/info', {
      'success': true,
      'result': {
        'id': '100001',
        'name': '林锦泽',
        'roles': ['admin'],
        'permissions':  [
          {
            // 一个路径一个对象，路径名为完整路径名
            path: '/index'
          }, {
            path: '/user/show',
            // permission存储数据级权限控制
            permission: ['modify', 'delete']
          }
        ]
      },
      'error': {
        'code': 100000,
        'message': '无效的token'
      }
    })
  }
}
```

编写导航钩子，载入权限表，判断页面权限，`src/router/index.js`
``` js {13-32,50-67}
import Vue from 'vue'
import Router from 'vue-router'
import whiteList from './whiteList'
import staticRoute from './staticRoute'
import {requestUserInfo} from '@/api/user'

Vue.use(Router)

const router = new Router({
  routes: staticRoute
})

/* 利用router.meta保存数据级权限 */
const router_init = (permissions) => {
  permissions.forEach(function (v) {
    let routeItem = router.match(v.path)
    if (routeItem) {
      routeItem.meta.permission = v.permission ? v.permission : []
    }
  })
}

/* 检测用户是否有权限访问页面 */
const page_permission = (permissions, to_path, next) => {
  let allow_page = false
  permissions.forEach(function (v) {
    if (v.path === to_path) {
      allow_page = true
    }
  })
  allow_page ? next() : next({path: '/error/401'})
}

/* 权限控制 */
router.beforeEach((to, from, next) => {
  /* 忽略错误页面的权限判断 */
  if (to.path.indexOf('/error') === 0) {
    return next()
  }
  /* 进入登录页面将注销用户信息 */
  if (to.path === '/login') {
    sessionStorage.removeItem('user-info')
    localStorage.removeItem('user-token')
  }
  /* 免登录页面 */
  if (whiteList.indexOf(to.fullPath) >= 0) {
    return next()
  }
  let user_info = JSON.parse(sessionStorage.getItem('user-info'))
  /* 上次会话结束，重新获取用户信息 */
  if (!user_info) {
    requestUserInfo({}).then(user_info => {
      console.log('tesst')
      const permissions = user_info.permissions || []
      router_init(permissions)
      page_permission(permissions, to.fullPath, next)
      console.log('tesst2')
    }).catch((err) => {
      /* token失效，重新登录 */
      console.warn(err)
      next({path: '/login'})
    })
  } else {
    /* 已登录时判断页面权限 */
    const permissions = user_info.permissions || []
    page_permission(permissions, to.fullPath, next)
  }
})

export default router
```

## 数据权限控制
页面渲染时使用`v-if`判断是否显示某些功能。