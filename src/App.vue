<template>
  <div id="app">
    <img src="./assets/logo.png">
    <date-line />
  </div>
</template>

<script>
import dateLine from './components/dateLine'

export default {
  name: 'App',
  components: {
    dateLine
  },
  data() {
    return {
      d: "2019-10-16"
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.date-line {
  position: absolute;
  top: 50%;
  left: 24%;
}
html {
   background: #000;
   
}
</style>
