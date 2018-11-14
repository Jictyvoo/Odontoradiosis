<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImageLandmark extends Model {
	function image(){
	    return $this->hasOne('App\Models\Image', 'fk_id_image');
    }
}
