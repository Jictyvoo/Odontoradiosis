<template>
  <nav
    class="main-header navbar navbar-expand bg-white navbar-light border-bottom"
  >
    <ul class="navbar-nav">
      <li class="nav-item d-none d-sm-inline-block">
        <a style="cursor: pointer" class="nav-link">
          <i class="nav-icon fa fa-dashboard">
            <img :src="require('../assets/img/open-folder.png')" />
          </i>
          <p onclick="openImageSelection()">Abrir radiografia</p>
        </a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a style="cursor: pointer" class="nav-link">
          <i class="nav-icon fa fa-dashboard">
            <img :src="require('../assets/img/writing.png')" />
          </i>
          <p onclick="openWindowSave()">Editar radiografia</p>
        </a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a style="cursor: pointer" class="nav-link">
          <i class="nav-icon fa fa-dashboard">
            <img :src="require('../assets/img/setting.png')" />
          </i>
          <p id="semiautomatic_button">Marcação semiautomática</p>
        </a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a style="cursor: pointer" class="nav-link">
          <i class="nav-icon fa fa-dashboard">
            <img :src="require('../assets/img/save.png')" />
          </i>
          <p onclick="save()">Salvar</p>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Navbar",
  props: {},
});
</script>
