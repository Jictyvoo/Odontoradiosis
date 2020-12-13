<template>
  <li class="nav-item d-none d-sm-inline-block">
    <a style="cursor: pointer" class="nav-link">
      <i class="nav-icon fa fa-dashboard">
        <img src="/public/img/save.png" />
      </i>
      <p onclick="openImageSelection()">{{ text }}</p>
    </a>
  </li>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NavItems",
  props: {},
});
</script>
