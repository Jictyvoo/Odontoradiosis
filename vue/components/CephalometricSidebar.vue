<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a href="http://127.0.0.1:8000/home" class="brand-link">
      <img
        width="200"
        height="133"
        src="http://127.0.0.1:8000/img/odontoradiosis_logo.png"
        alt="Odontoradiosis"
      />
    </a>
    <div class="sidebar">
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <li class="nav-item has-treeview menu-open"></li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="fa fa-circle-o nav-icon"></i>
              <p>Curvas</p>
              <select id="curvesId" style="width: 60%; color: black">
                <option selected="">Selecione</option>
                <option>Perfil Mole</option>
                <option>Sela Túrcica</option>
                <option>Sutura Fronto-Nasal</option>
                <option>Borda Póstero-Inferior</option>
                <option>Fissura Pterigomaxilar</option>
                <option>Pório Anatômico</option>
                <option>Maxila</option>
                <option>Mandíbula</option>
                <option>Incisivo Central Superior</option>
                <option>Incisivo Central Inferior</option>
                <option>Dente Posterior Superior</option>
                <option>Dente Posterior Inferior</option>
              </select>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="fa fa-circle-o nav-icon"></i>
              <p>Pontos</p>
              <select
                class="right fa fa-angle-left"
                id="pointsId"
                style="width: 60%; color: black"
              >
                <option selected="">Selecione</option>
                <option>Sela (S)</option>
                <option>Násio (N)</option>
                <option>Espinha nasal anterior (ENA)</option>
                <option>Espinha nasal posterior (ENP)</option>
                <option>Ponto subespinhal (A)</option>
                <option>Ponto pupramental (B)</option>
                <option>Pogônio (Pog)</option>
                <option>Gnátio (Gn)</option>
                <option>Mento (Me)</option>
                <option>Condílio (Co)</option>
                <option>Pró-nasal (Pn)</option>
                <option>Pogônio Mole (Pg)</option>
                <option>Palato Mole (pm)</option>
                <option>Gônio (Go)</option>
                <option>Órbitário (Or)</option>
                <option>Pório (Po)</option>
                <option>Ponta do Nariz (PN)</option>
                <option>Fossa Ptérigo Maxilar (Fpm)</option>
                <option>Pterigóide (Pt)</option>
              </select>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="fa fa-circle-o nav-icon"></i>
              <label for="contrast">Contraste</label><br />
              <input type="range" id="contrast" min="0" max="200" value="100" />
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="fa fa-circle-o nav-icon"></i>
              <label for="brightness">Brilho</label><br />
              <input
                type="range"
                id="brightness"
                min="0"
                max="200"
                value="100"
              />
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="fa fa-circle-o nav-icon"></i>
              <label for="invert">Negativo</label><br />
              <input type="range" id="invert" min="0" max="100" value="0" />
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="fa fa-circle-o nav-icon"></i>
              <label for="grayscale">Escala de Cinza</label><br />
              <input type="range" id="grayscale" min="0" max="100" value="0" />
            </a>
          </li>
          <li class="active">
            <a href="#">
              <label class="filter-label">
                <font color="#696969">
                  <input
                    class="btn btn-primary"
                    type="button"
                    value="Desfazer"
                    id="undone-effects"
                  />
                </font>
              </label>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>
