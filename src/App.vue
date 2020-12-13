<template>
  <div id="app">
    <Navbar>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <router-view />
    </Navbar>
    <CephalometricSidebar></CephalometricSidebar>
    <StackingCanvas></StackingCanvas>
    <footer class="main-footer">
      <strong>
        ©2020
        <a href="https://github.com/jictyvoo/"> João Victor Oliveira Couto </a>
        <br />
        Powered by <a href="https://vuejs.org/" target="_blank">VueJS</a>
      </strong>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "./components/Navbar.vue";
import CephalometricSidebar from "./components/CephalometricSidebar.vue";
import StackingCanvas from "./components/StackingCanvas.vue";
export default Vue.extend({
  name: "App-Odontoradiosis",
  components: {
    Navbar,
    CephalometricSidebar,
    StackingCanvas,
  },
});
</script>

<style lang="scss">
@import "./assets/styles/marking_system.css";
#app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: #333;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  line-height: 1.4;
  margin: 0 auto;
  text-align: center;
}
h1 {
  text-align: center;
}
</style>
