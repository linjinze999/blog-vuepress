module.exports = {
  dest: 'vuepress',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '林锦泽的个人博客',
      description: 'linjinze999@163.com'
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  markdown: {
    lineNumbers: true
  },
  theme: 'vue',
  themeConfig: {
    repo: 'linjinze999/linjinze999.github.io',
    docsDir: 'docs',
    editLinks: true,
    locales: {
      '/': {
        editLinkText: '帮助我改进此页',
        lastUpdated: '上次更新',
        nav: [
          {
            text: 'Gerrit运维',
            link: '/gerrit/',
          }
        ],
        sidebar: {
          '/gerrit/': genSidebarConfig('Gerrit运维')
        }
      }
    }
  }
}

function genSidebarConfig (title) {
  return [
    {
      title,
      collapsable: true,
      children: [
        '',
		'deploy',
		'config',
		'upgrade',
		'distribute',
		'docker',
		'extend',
		'develop',
		'question'
      ]
    }
  ]
}
