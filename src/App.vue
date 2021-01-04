<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
html{
    font-size:62.5%;
}
html,
body,
#app {
    width: 100%;
    height: 100%;
}

.ant-layout {
    height: 100%;
}

#components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}

#components-layout-demo-custom-trigger .logo img {
    width: 100%;
}
.site-page-header-ghost-wrapper{
    /* background-color: #f5f5f5; */
}
.form{
    background-color: #f0f2f5;
    padding: 15px;
}
.Sider_title{
    color: #fff;
    font-size: 2rem;
    text-align: center;
    padding: 8px 0;
}
.Sider_title .name{
    font-size: 1.6rem;
    vertical-align: text-top;
}
.Sider_title img{
    width: 20px;
}
.light-row{
    background-color: rgba(255,255,255,1);
}
.dark-row{
    background-color: rgba(245,237,245,0.6);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.Icon_img{
    width: 21px;
    height: 21px;
    background-size: 184px 184px;
    background-repeat: no-repeat;
    margin: 0 auto;
}
.Icon_img2{
    width: 21px;
    height: 20px;
    background-size: 143px 143px;
    background-repeat: no-repeat;
    float: left;
    margin-top: 9px;
}
/* // 成功色 */
.ant-btn.ant-btn-success{
  color: #fff;
  background: #52c41a;
  border-color: #52c41a;
}
.ant-btn.ant-btn-success:hover, .ant-btn.ant-btn-success:focus{
  color: #fff;
  background: #52c41a;
  border-color: #52c41a;
}
</style>
