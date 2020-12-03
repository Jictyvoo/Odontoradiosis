<template>
  <div id="app">
    <h1>Welcome</h1>
    <p>Welcome to your new Drash + Vue app!</p>
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
export default {
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
  max-width: 400px;
  text-align: center;
}
h1 {
  text-align: center;
}
</style>
