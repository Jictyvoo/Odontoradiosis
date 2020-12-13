<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/ico.png" />
    <Navbar msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "Home",
  components: {
    Navbar,
  },
});
</script>
