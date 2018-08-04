<template>
  <el-container class="is-vertical">
    <div class="my-page main">
      <el-card class="main-card">
        <h1 align="center"><img src="hero.png" class="logo-img"></h1>
        <h3 align="center">林锦泽</h3>
        <p align="center">世间所有不愉快，都是由当事者能力不足所导致的。<br>所以，变强吧。</p>
        <div class="categories">
            <router-link to="/gerrit/">
              <el-button type="success" round>Gerrit运维</el-button>
            </router-link>
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
        <el-row>
          <el-col :span="6">
            <el-progress type="circle" :percentage="80"></el-progress>
            <p>Javascript</p>
          </el-col>
          <el-col :span="6">
            <el-progress type="circle" :percentage="80"></el-progress>
            <p>Python</p>
          </el-col>
          <el-col :span="6">
            <el-progress type="circle" :percentage="80"></el-progress>
            <p>Java</p>
          </el-col>
          <el-col :span="6">
            <el-progress type="circle" :percentage="80"></el-progress>
            <p>C++</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-progress type="circle" :percentage="80"></el-progress>
            <p>Node</p>
          </el-col>
          <el-col :span="6">
            <el-progress type="circle" :percentage="80"></el-progress>
            <p>Django</p>
          </el-col>
          <el-col :span="6">
            <el-progress type="circle" :percentage="80"></el-progress>
            <p>SpringMVC</p>
          </el-col>
          <el-col :span="6">
            <el-progress type="circle" :percentage="80"></el-progress>
            <p>Docker</p>
          </el-col>
        </el-row>
      </div>
      <div class="skill-small">
        <el-row>
          <el-col :span="6">
            <el-progress type="circle" :percentage="80" :width="80"></el-progress>
            <p>Javascript</p>
          </el-col>
          <el-col :span="6">
            <el-progress type="circle" :percentage="80" :width="80"></el-progress>
            <p>Python</p>
          </el-col>
          <el-col :span="6">
            <el-progress type="circle" :percentage="80" :width="80"></el-progress>
            <p>Java</p>
          </el-col>
          <el-col :span="6">
            <el-progress type="circle" :percentage="80" :width="80"></el-progress>
            <p>C++</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-progress type="circle" :percentage="80" :width="80"></el-progress>
            <p>Node</p>
          </el-col>
          <el-col :span="6">
            <el-progress type="circle" :percentage="80" :width="80"></el-progress>
            <p>Django</p>
          </el-col>
          <el-col :span="6">
            <el-progress type="circle" :percentage="80" :width="80"></el-progress>
            <p>SpringMVC</p>
          </el-col>
          <el-col :span="6">
            <el-progress type="circle" :percentage="80" :width="80"></el-progress>
            <p>Docker</p>
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
        <el-steps direction="vertical" :active="1" finish-status="success">
          <el-step title="滴滴出行" description="使用Avalon MVVM框架开发前端WEB网页。" icon="el-icon-location-outline"></el-step>
          <el-step title="TP-LINK" description="使用python的Django框架开发网站。维护Gerrit、Jenkins等系统。" icon="el-icon-location-outline"></el-step>
          <el-step title="未完待续" icon="el-icon-location-outline"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="my-page contact">
      <h4>个人主页</h4>
      <p><img src="/assets/img/home-qr.png"/></p>
      <p>Email © linjinze999@163.com</p>
    </div>
  </el-container>
</template>

<script>
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(ElementUI);
export default {}
</script>

<style>
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
  width:80%;
  max-width: 450px;
}

.categories {
  text-align:center;
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

.contact img{
  margin-top: 15px;
  width: 200px;
  heigth: 200px;
}

@media (min-width: 720px) {
  .skill-large {
    display: block;
  }
  .skill-small{
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

@media (max-width: 720px){
  .logo-img {
    width: 80px;
    height: 72px;
  }
  .my-page {
    height: 450px;;
  }
  .skill-large {
    display: none;
  }
  .skill-small {
    display: block;
  }
}

</style>