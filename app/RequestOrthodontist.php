<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequestOrthodontist extends Model
{
    protected $fillable = [
		'name', 'email', 'password', 'access_level', 'cpf', 'cro'
	];
}
