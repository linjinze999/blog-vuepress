<template>
  <el-container class="is-vertical">
    <div class="my-page main">
      <el-card class="main-card">
        <h1 align="center"><img v-bind:src="avatars" class="logo-img"></h1>
        <h3 align="center">{{ title }}</h3>
        <p align="center" v-html="description"></p>
        <div class="categories">
          <a v-for="ca in catalog" :href="ca.link" :key="ca.link">
            <el-button type="success" round size="small">{{ ca.name }}</el-button>
          </a>
        </div>
      </el-card>
    </div>
    <div class="my-page skill">
      <div class="title">
        <i class="el-icon-loading" style="margin-right:20px;"></i>
        技能概览
        <i class="el-icon-loading" style="margin-left:20px;"></i>
      </div>
      <div class="skill-large">
        <el-row v-for="index of (Math.ceil(skills.length / 4))" :key="'skill' + index">
          <el-col :span="6" v-for="sk in skills.slice((index - 1) * 4, (index - 1) * 4 + 4)" :key="index+'-'+JSON.stringify(sk)">
            <el-progress type="circle" :percentage="sk.percentage" :width="skill_large_size"></el-progress>
            <p>{{ sk.name }}</p>
          </el-col>
        </el-row>
      </div>
      <div class="skill-small">
        <el-row v-for="index of (Math.ceil(skills.length / 4))" :key="'skill_sm'+index">
          <el-col :span="6" v-for="sk in skills.slice((index - 1) * 4, (index - 1) * 4 + 4)" :key="index+'-'+JSON.stringify(sk)">
            <el-progress type="circle" v-bind:percentage="sk.percentage" :width="skill_small_size"></el-progress>
            <p>{{ sk.name }}</p>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="my-page experience">
      <div class="title">
        <i class="el-icon-loading" style="margin-right:20px;"></i>
        工作经历
        <i class="el-icon-loading" style="margin-left:20px;"></i>
      </div>
      <div class="experience-content">
        <el-steps direction="vertical" :active="experience.length - 1" finish-status="success">
          <el-step v-for="exp in experience" v-bind:title="exp.title" v-bind:description="exp.description"
                   icon="el-icon-location-outline" :key="exp.title"></el-step>
          <el-step title="未完待续" icon="el-icon-location-outline"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="my-page contact">
      <h4>个人主页</h4>
      <p><img v-bind:src="my_home_qr"/></p>
      <p>{{ my_home_text }}</p>
    </div>
  </el-container>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000}
Vue.use(ElementUI)
export default {
  data: function () {
    return {
      avatars: 'hero.png',
      title: '林锦泽',
      description: '世间所有不愉快，都是由当事者能力不足所导致的。<br/>所以，变强吧。',
      catalog: [
        {name: 'Uni组件库', link: 'https://linjinze999.github.io/uni/'},
        {name: 'Gerrit运维', link: '/gerrit/'},
        {name: 'vue-llplatform', link: 'https://linjinze999.github.io/vue-llplatform/'}
      ],
      skills: [
        {name: 'Javascript', percentage: 80},
        {name: 'Vue', percentage: 80},
        {name: 'React', percentage: 65},
        {name: 'Nodejs', percentage: 70},
        {name: 'Docker', percentage: 80},
        {name: 'Python/Django', percentage: 75},
        {name: 'Java/SpringMVC', percentage: 60},
        {name: 'C++', percentage: 50},
      ],
      skill_large_size: 120,
      skill_small_size: 80,
      experience: [{
        title: '滴滴出行',
        description: '使用Avalon MVVM框架开发前端WEB网页。'
      }, {
        title: 'TP-LINK',
        description: '使用Django开发部门DevOps网站。维护Gerrit、Jenkins等CI/CD系统及其Docker容器化。Vue前端web网站。'
      }, {
        title: '腾讯音乐',
        description: '移动端开发...'
      }],
      my_home_qr: '/assets/img/home-qr.png',
      my_home_text: 'Email © linjinze999@163.com',
    }
  }
}
</script>

<style scoped>
.my-page {
  width: 100%;
  height: 800px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.main {
  align-items: center;
  justify-content: center;
  background: url(/assets/img/services-bg.jpg);
  background-color: #f2f6fc;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.main-card {
  width: 80%;
  max-width: 450px;
}

.categories {
  text-align: center;
}

.categories a {
  margin-left: 15px;
}

.categories button {
  margin-bottom: 5px;
}

.logo-img {
  width: 150px;
  height: 136px;
}

.skill {
  background: url(/assets/img/skills-bg.jpg);
  background-color: #f2f6fc;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  height: 15%;
}

.skill .el-row {
  margin-top: 50px;
  margin-bottom: 20px;
}

.skill .el-col {
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.experience {
  align-items: center;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.experience-content {
  height: 70%;
  margin-top: 40px;
}

.contact {
  color: #ffffff;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: url(/assets/img/contact-bg.jpg);
  background-color: #f2f6fc;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.contact img {
  margin-top: 15px;
  width: 200px;
  heigth: 200px;
}

@media (min-width: 720px) {
  .skill-large {
    display: block;
  }

  .skill-small {
    display: none;
  }
}

@media (min-width: 1900px) {
  .my-page {
    height: 900px;;
  }
}

@media (max-width: 1400px) {
  .my-page {
    height: 600px;;
  }
}

@media (max-width: 720px) {
  .logo-img {
    width: 80px;
    height: 72px;
  }

  .skill-large {
    display: none;
  }

  .skill-small {
    display: block;
  }
}

</style>
