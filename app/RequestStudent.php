<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequestStudent extends Model
{
    protected $fillable = [
		'name', 'email', 'password', 'access_level', 'cpf', 'registration_guide'
	];
}
