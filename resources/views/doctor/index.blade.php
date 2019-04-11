@extends('layouts.doctor')

@section('page-title', 'Landmark Measurement')

@section('content')
    <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
            <ul class="nav nav-sidebar">
                <li class="active"><a href="#">
                        <label class="filter-label">Curvas</label>
                        <select id="curvesId" style="width: 80%; color:black">
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
                    </a></li>
                <li class="active"><a href="#"><label class="filter-label">Pontos</label>
                        <select id="pointsId" style="width: 80%; color:black">
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
                        </select></a></li>
                <li class="active"><a href="#">
                        <label class="filter-label">Contraste</label>
                        <input type="range" id="contrast" min="0" max="200" value="100"/>
                    </a></li>
                <li class="active"><a href="#">
                        <label class="filter-label">Brilho</label>
                        <input type="range" id="brightness" min="0" max="200" value="100"/>
                    </a></li>
                <li class="active"><a href="#">
                        <label class="filter-label">Escala de cinza</label>
                        <input type="range" id="grayscale" min="0" max="100" value="0"/>
                    </a></li>
                <li class="active"><a href="#">
                        <label class="filter-label">Negativo</label>
                        <input type="range" id="invert" min="0" max="100" value="0"/>
                    </a></li>
                <li class="active"><a href="#">
                        <label class="filter-label"><font color="#696969"><input type="button" value="Desfazer"
                                                                                 onclick="reset()"/></font></label>
                    </a></li>
            </ul>
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <div class="page-header">
                <table class="methods-table" width="400px" border="0">
                    <tr>
                        <td>
                            <input type="image" name="selectImage" src="{{ asset('img/Abrir.png') }}"
                                   onClick="openImageSelection()">
                        </td>
                        <td>
                            <input type="image" name="markStitch" src="{{ asset('img/Ponto.png') }}"
                                   onClick="openWindowSave()">
                        </td>
                    <!--<td>
                            <input type="image" name="generateMeasurement" src="{{ asset('img/Tracar.png') }}" onClick="this.form.submit()">
                        </td>-->
                        <td>
                            <input type="image" name="unmake" src="{{ asset('img/Desfazer.png') }}"
                                   onClick="desfazer()">
                        </td>
                        <td>
                            <form method="post" action="{{ route('image_landmark.store') }}">
                                @csrf
                                <input type="hidden" name="bezierCurves" id="bezier_curves" value=""/>
                                <input type="hidden" name="savedPoints" id="saved_points" value=""/>
                                <input type="hidden" name="currentImage" id="current_image" value=""/>
                                <input type="image" name="save" src="{{ asset('img/salvar.png') }}"
                                       onClick="this.form.submit()">
                            </form>
                        </td>

                    </tr>
                </table>
            </div>
            <div id="stack-canvas">
                <canvas id="image"></canvas>
                <canvas id="landmarks"></canvas>
                <canvas id="bezier"></canvas>
            </div>
        </div>
    </div>
    <script lang="js">
        function openImageSelection() {
            window.open("{{ route('image.index') }}", "_blank", "width=600, height=400");
        }

        function openWindowSave() {
            window.open("{{ route('image_landmark.index') }}", "_blank", "width=600, height=400");
        }

        let curves_url = "{{ route('bezier_curve.show', "%REPLACE%") }}";
    </script>
@endsection
