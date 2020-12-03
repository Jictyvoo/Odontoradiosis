<template>
    <aside className="control-sidebar control-sidebar-dark">
        <div className="p-3">
          <h5>Ações</h5>
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item has-treeview menu-open">
              <a style={{ cursor: "pointer" }} className="nav-link active">
                <i className="nav-icon fa fa-dashboard">
                  <img src="http://127.0.0.1:8000/img/open-folder.png" />
                </i>
                <p onclick="openImageSelection()">Abrir radiografia</p>
              </a>
            </li>
            <li className="nav-item has-treeview menu-open">
              <a style={{ cursor: "pointer" }} className="nav-link active">
                <i className="nav-icon fa fa-dashboard">
                  <img src="http://127.0.0.1:8000/img/writing.png" />
                </i>
                <p onclick="openWindowSave()">Editar radiografia</p>
              </a>
            </li>
            <li className="nav-item has-treeview menu-open">
              <a style={{ cursor: "pointer" }} className="nav-link active">
                <i className="nav-icon fa fa-dashboard">
                  <img src="http://127.0.0.1:8000/img/setting.png" />
                </i>
                <p id="semiautomatic_button">Marcação semiautomática</p>
              </a>
            </li>
            <li className="nav-item has-treeview menu-open">
              <form method="post" action="http://127.0.0.1:8000/image_landmark">
                <input
                  type="hidden"
                  name="bezierCurves"
                  id="bezier_curves"
                  defaultValue
                />
                <input
                  type="hidden"
                  name="savedPoints"
                  id="saved_points"
                  defaultValue
                />
                <input
                  type="hidden"
                  name="currentImage"
                  id="current_image"
                  defaultValue
                />
                <input
                  type="button"
                  defaultValue="Salvar"
                  onclick="this.form.submit()"
                  className="btn btn-primary"
                />
              </form>
            </li>
          </ul>
        </div>
      </aside>
</template>