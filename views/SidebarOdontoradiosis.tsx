import { React } from "../../../deps.ts";
import { Sidebar } from "./components/Sidebar.tsx";

interface StateProps {
  tracingValue: string;
}

class SidebarOdontoradiosis extends React.Component {
  private state: StateProps;

  constructor(props: any) {
    super(props);
    this.state = { tracingValue: "choose" };

    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <Sidebar>
        <p>Curvas</p>
        <select value={this.state.tracingValue} onchange="curve()">
          <option value="null">Selecione</option>
          <option value="perfil-mole">Perfil Mole</option>
          <option value="null">Sela Túrcica</option>
          <option value="null">Sutura Fronto-Nasal</option>
          <option value="null">Borda Póstero-Inferior</option>
          <option value="null">Fissura Pterigomaxilar</option>
          <option value="null">Pório Anatômico</option>
          <option value="null">Maxila</option>
          <option value="null">Mandíbula</option>
          <option value="null">Incisivo Central Superior</option>
          <option value="null">Incisivo Central Inferior</option>
          <option value="null">Dente Posterior Superior</option>
          <option value="null">Dente Posterior Inferior</option>
        </select>
        <p>Pontos</p>
        <select
          className="right fa fa-angle-left"
          id="pointsId"
          style="width: 60%; color:black"
        >
          <option value="null">Selecione</option>
          <option value="null">Sela (S)</option>
          <option value="null">Násio (N)</option>
          <option value="null">Espinha nasal anterior (ENA)</option>
          <option value="null">Espinha nasal posterior (ENP)</option>
          <option value="null">Ponto subespinhal (A)</option>
          <option value="null">Ponto pupramental (B)</option>
          <option value="null">Pogônio (Pog)</option>
          <option value="null">Gnátio (Gn)</option>
          <option value="null">Mento (Me)</option>
          <option value="null">Condílio (Co)</option>
          <option value="null">Pró-nasal (Pn)</option>
          <option value="null">Pogônio Mole (Pg)</option>
          <option value="null">Palato Mole (pm)</option>
          <option value="null">Gônio (Go)</option>
          <option value="null">Órbitário (Or)</option>
          <option value="null">Pório (Po)</option>
          <option value="null">Ponta do Nariz (PN)</option>
          <option value="null">Fossa Ptérigo Maxilar (Fpm)</option>
          <option value="null">Pterigóide (Pt)</option>
        </select>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fa fa-circle-o nav-icon"></i>
            <label for="contrast">Contraste</label>
            <br></br>
            <input type="range" id="contrast" min="0" max="200" value="100" />
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fa fa-circle-o nav-icon"></i>
            <label for="brightness">Brilho</label>
            <br></br>
            <input type="range" id="brightness" min="0" max="200" value="100" />
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fa fa-circle-o nav-icon"></i>
            <label for="invert">Negativo</label>
            <br></br>
            <input type="range" id="invert" min="0" max="100" value="0" />
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fa fa-circle-o nav-icon"></i>
            <label for="grayscale">Escala de Cinza</label>
            <br></br>
            <input type="range" id="grayscale" min="0" max="100" value="0" />
          </a>
        </li>
        <li className="active">
          <a href="#">
            <label className="filter-label">
              <font color="#696969">
                <input
                  className="btn btn-primary"
                  type="button"
                  value="Desfazer"
                  id="undone-effects"
                />
              </font>
            </label>
          </a>
        </li>
      </Sidebar>
    );
  }
}
