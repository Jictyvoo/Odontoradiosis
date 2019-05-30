@extends('layouts.master')

@section('page-title', 'Landmark Measurement')

@section('content_sidebar')

    <li class="nav-item has-treeview menu-open">
    <li class="nav-item">
        <a href="#" class="nav-link">
            <i class="fa fa-circle-o nav-icon"></i>
            <p>Curvas</p>
            <select id="curvesId" style="width: 60%; color:black">
                <option selected>Selecione</option>
                <option onclick="curve()">Perfil Mole</option>
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
            <select class="right fa fa-angle-left" id="pointsId" style="width: 60%; color:black"
                    onclick="referenceLandmarks()">
                <option selected>Selecione</option>
                <option>Básio (Ba)</option>
                <option>Sela (S)</option>
                <option>Násio (N)</option>
                <option>Espinha nasal anterior (ENA)</option>
                <option>Espinha nasal posterior (ENP)</option>
                <option>Ponto subespinhal (A)</option>
                <option>Ponto pupramental (B)</option>
                <option>Próstil (Pr)</option>
                <option>Infradental (Id)</option>
                <option>Pogônio (Pog)</option>
                <option>Gnátio (Gn)</option>
                <option>Mento (Me)</option>
                <option>Ponto D (D)</option>
                <option>Bolton (Bo)</option>
                <option>Articular (Ar)</option>
                <option>Pório (Po)</option>
                <option>Pterigóideo (Pt)</option>
                <option>Ponto E (E)</option>
                <option>Mentoniano (Men)</option>
                <option>Condílio (Co)</option>
                <option>Pró-nasal (Pn)</option>
                <option>Columela (Cm)</option>
                <option>Subnasal (Sn)</option>
                <option>Lábio Superior (Ls)</option>
                <option>Stomion Superior (Sts)</option>
                <option>Pogônio Mole (Pg’)</option>
                <option>Palato Mole (pm)</option>
                <option>Adenóide (ad)</option>
                <option>Ponto bl (bl)</option>
                <option>Ponto bf (bf)</option>
            </select>
        </a>
    </li>
    <li class="nav-item">
        <a href="#" class="nav-link">
            <i class="fa fa-circle-o nav-icon"></i>
            <label for="contrast">Contraste</label><br>
            <input type="range" id="contrast" min="0" max="200" value="100"/>
        </a>
    </li>
    <li class="nav-item">
        <a href="#" class="nav-link">
            <i class="fa fa-circle-o nav-icon"></i>
            <label for="brightness">Brilho</label><br>
            <input type="range" id="brightness" min="0" max="200" value="100"/>
        </a>
    </li>
    <li class="nav-item">
        <a href="#" class="nav-link">
            <i class="fa fa-circle-o nav-icon"></i>
            <label for="invert">Negativo</label><br>
            <input type="range" id="invert" min="0" max="100" value="0"/>
        </a>
    </li>
    <li class="nav-item">
        <a href="#" class="nav-link">
            <i class="fa fa-circle-o nav-icon"></i>
            <label for="grayscale">Escala de Cinza</label><br>
            <input type="range" id="grayscale" min="0" max="100" value="0"/>
        </a>
    </li>
    <li class="active"><a href="#">
            <label class="filter-label"><font color="#696969"><input class="btn btn-primary" type="button"
                                                                     value="Desfazer"
                                                                     onclick="reset()"/></font></label>
        </a></li>
    </li>


    <script lang="js">
        function openImageSelection() {
            window.open("{{ route('image.index') }}", "_blank", "width=600, height=400");
        }

        function openWindowSave() {
            window.open("{{ route('image_landmark.index') }}", "_blank", "width=600, height=400");
        }

        let curves_url = "{{ route('bezier_curve.show', "%REPLACE%") }}";
            <?php use Illuminate\Support\Facades\Storage; ?>
        let reference_images_url = "{{ Storage::url("reference_landmarks") }}/";
    </script>
@endsection


@section('content')

    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <!-- Add icons to the links using the .nav-icon class
             with font-awesome or any other icon font library -->
        <li class="nav-item has-treeview menu-open">
            <a href="#" class="nav-link active">
                <i class="nav-icon fa fa-dashboard"><img src="{{ asset('img/open-folder.png') }}"></i>
                <p onClick="openImageSelection()">
                    Abrir radiografia
                </p>
            </a>
        </li>
        <li class="nav-item has-treeview menu-open">
            <a href="#" class="nav-link active">
                <i class="nav-icon fa fa-dashboard"><img src="{{ asset('img/writing.png') }}"></i>
                <p onClick="openWindowSave()">
                    Editar radiografia
                </p>
            </a>
        </li>
        <li class="nav-item has-treeview menu-open">
            <a href="#" class="nav-link active">
                <i class="nav-icon fa fa-dashboard"><img src="{{ asset('img/setting.png') }}"></i>
                <p onClick="calculateLandmarks()">
                    Marcação automática
                </p>
            </a>
        </li>
        <li class="nav-item has-treeview menu-open">
            <a href="#" class="nav-link active">
                <i class="nav-icon fa fa-dashboard"><img src="{{ asset('img/invert-tool.png') }}"></i>
                <p onClick="desfazer()">
                    Desfazer
                </p>
            </a>
        </li>
        <li class="nav-item has-treeview menu-open">
            <form method="post" action="{{ route('image_landmark.store') }}">
                @csrf
                <input type="hidden" name="bezierCurves" id="bezier_curves" value=""/>
                <input type="hidden" name="savedPoints" id="saved_points" value=""/>
                <input type="hidden" name="currentImage" id="current_image" value=""/>
                <button onClick="this.form.submit()" class="nav-link active">
                    <i class="nav-icon fa fa-dashboard"><img src="{{ asset('img/save-button.png') }}"></i>
                    <p>
                        Salvar
                    </p>
                </button>
            </form>
        </li>
    </ul>
@endsection
