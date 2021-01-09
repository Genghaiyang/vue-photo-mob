<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "微软雅黑", "黑体", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 0.24rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
