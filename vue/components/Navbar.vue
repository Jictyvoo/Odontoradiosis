<template>
  <nav
    class="main-header navbar navbar-expand bg-white navbar-light border-bottom"
  >
    <ul class="navbar-nav">
      <li class="nav-item d-none d-sm-inline-block">
        <a style="cursor: pointer" class="nav-link">
          <i class="nav-icon fa fa-dashboard">
            <img src="/public/img/open-folder.png" />
          </i>
          <p onclick="openImageSelection()">Abrir radiografia</p>
        </a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a style="cursor: pointer" class="nav-link">
          <i class="nav-icon fa fa-dashboard">
            <img src="/public/img/writing.png" />
          </i>
          <p onclick="openWindowSave()">Editar radiografia</p>
        </a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a style="cursor: pointer" class="nav-link">
          <i class="nav-icon fa fa-dashboard">
            <img src="/public/img/setting.png" />
          </i>
          <p id="semiautomatic_button">Marcação semiautomática</p>
        </a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a
          class="nav-link"
          data-widget="control-sidebar"
          data-slide="true"
          href="#"
        >
          <i class="fa fa-th-large">
            <img src="/public/img/mini-menu.png" />
          </i>
        </a>
      </li>
    </ul>
  </nav>
</template>
