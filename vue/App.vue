<template>
  <div id="app">
    <Navbar></Navbar>
    <CephalometricSidebar></CephalometricSidebar>
    <StackingCanvas></StackingCanvas>
    <footer class="main-footer">
      <strong>
        ©2020
        <a href="https://github.com/jictyvoo/"> João Victor Oliveira Couto </a>
        <br />
        Powered by <a href="http://deno.land" target="_blank">Deno</a>
      </strong>
    </footer>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import CephalometricSidebar from "./components/CephalometricSidebar";
import StackingCanvas from "./components/StackingCanvas";
export default {
  components: {
    Navbar,
    CephalometricSidebar,
    StackingCanvas,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
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
