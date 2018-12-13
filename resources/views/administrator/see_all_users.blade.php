@extends('layouts.administrator')

@section('titlePage', "All Users")

@section('content')
	<table>
		<thead>
		<tr>
			<th>
				Users
			</th>
		</tr>
		</thead>
		<tbody>
		@foreach($users as $user)
			<tr>
				<td>
					{{ $user->name }}
				</td>
			</tr>
		@endforeach
		</tbody>
	</table>
@endsection
