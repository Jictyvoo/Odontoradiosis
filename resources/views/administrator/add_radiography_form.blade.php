@extends('layouts.administrator')

@section('titlePage', "Add Radiography")

@section('content')
	<form action="{{ route('image.store') }}" method="POST" enctype="multipart/form-data">
		@csrf
		<div class="form-control">
			<div class="row">
				<div class="col-md-3"></div>
				<div class="col-md-6">
					<label for="img">Radiography</label>
					<input type="file" class="form-control-file" name="radiography" id="img">
					<input type="submit" value="Upload Radiography">
				</div>
				<div class="col-md-3"></div>
			</div>
		</div>
	</form>
@endsection
