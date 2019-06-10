@extends('layouts.administrator')

@section('content')
    <?php use Illuminate\Support\Facades\Storage; ?>
    @if((auth()->user()->access_level) > 0)
                    <h2 class="sub-header">Solicitações Pendentes - Ortodontistas</h2>
                    <div class="table-responsive">
                        @if(isset($requests) and count($requests) > 0)
                            <table class="table table-striped">
                                <thead class="thead-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>CRO</th>
                                    <th>CPF</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($requests as $request)
                                    <tr>
                                        <td>{{$request->id}}</td>
                                        <td>{{$request->name}}</td>
                                        <td>{{$request->email}}</td>
                                        <td>{{$request->cro}}</td>
                                        <td>{{$request->cpf}}</td>
                                        <td>
                                            <a href="{{route('approveOrthodontist', $request->id)}}"
                                               class="btn btn-success">Aprovar</a>
                                            <a href="{{route('refuseOrthodontist', $request->id)}}"
                                               class="btn btn-danger">Recusar</a>
                                        </td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                        @else
                            <span>Não existem solicitações pendentes</span>
                        @endif
                    </div>
                    <h2 class="sub-header">Solicitações Pendentes - Estudantes</h2>
                    <div class="table-responsive">
                        @if(isset($students) and count($students) > 0)
                            <table class="table table-striped">
                                <thead class="thead-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Guia de matrícula</th>
                                    <th>CPF</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($students as $student)
                                    <tr>
                                        <td>{{$student->id}}</td>
                                        <td>{{$student->name}}</td>
                                        <td>{{$student->email}}</td>
                                        <td><a href={{ Storage::url($student->registration_guide) }}>Matrícula</a></td>
                                        <td>{{$student->cpf}}</td>
                                        <td>
                                            <a href="{{route('approveStudent', $student->id)}}"
                                               class="btn btn-success">Aprovar</a>
                                            <a href="{{route('refuseStudent', $student->id)}}"
                                               class="btn btn-danger">Recusar</a>
                                        </td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                        @else
                            <span>Não existem solicitações pendentes</span>
                        @endif
                    </div>
                @endif
@endsection