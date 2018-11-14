<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Landmark extends Model {
	protected $primaryKey;

	function __construct(array $attributes = []) {
		parent::__construct($attributes);
		$this->primaryKey = 'id_landmark';
	}
}
