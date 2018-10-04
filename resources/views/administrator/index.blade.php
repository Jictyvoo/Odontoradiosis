@extends('layouts.administrator')

@section('content')
    <h1 class="page-header">Dashboard</h1>

    <div class="row placeholders">
        <div class="col-xs-6 col-sm-3 placeholder">
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200"
                 height="200" class="img-responsive" alt="Generic placeholder thumbnail">
            <h4>Insert new User</h4>
            <p><a class="btn btn-default" href="{{ route('register') }}" role="button">View details
                    &raquo;</a></p>
        </div>
        <div class="col-xs-6 col-sm-3 placeholder">
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200"
                 height="200" class="img-responsive" alt="Generic placeholder thumbnail">
            <h4>Insert new Radiographs</h4>
            <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
        </div>
        <div class="col-xs-6 col-sm-3 placeholder">
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200"
                 height="200" class="img-responsive" alt="Generic placeholder thumbnail">
            <h4>Export Database</h4>
            <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
        </div>
        <div class="col-xs-6 col-sm-3 placeholder">
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200"
                 height="200" class="img-responsive" alt="Generic placeholder thumbnail">
            <h4>Edit Users</h4>
            <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
        </div>
    </div>

    <h2 class="sub-header">Last Operations</h2>
    <div class="table-responsive">
        <table class="table table-striped">
            <thead>
            <tr>
                <th>Log ID</th>
                <th>User ID</th>
                <th>User Type</th>
                <th>Operation</th>
                <th>Date/Hour</th>
            </tr>
            </thead>
            <tbody>
			<?php for ($index = 0; $index < 2; $index += 1): ?>
            <tr>
                <td>1,001</td>
                <td>Lorem</td>
                <td>ipsum</td>
                <td>dolor</td>
                <td>sit</td>
            </tr>
			<?php endfor ?>
            </tbody>
        </table>
    </div>
@endsection