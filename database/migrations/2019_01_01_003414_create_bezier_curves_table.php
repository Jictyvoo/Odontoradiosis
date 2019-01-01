<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBezierCurvesTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('bezier_curves', function (Blueprint $table) {
			$table->increments('id');
			$table->string('name', 30);
			$table->unsignedInteger('image_id');
			$table->unsignedInteger('bezier_point_id');
			$table->foreign('image_id')->references('id')->on('images')->onDelete('cascade');
			$table->foreign('bezier_point_id')->references('id')->on('bezier_points')->onDelete('cascade');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('bezier_curves');
	}
}
