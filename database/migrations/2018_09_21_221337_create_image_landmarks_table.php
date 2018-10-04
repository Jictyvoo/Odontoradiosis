<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImageLandmarksTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('image_landmarks', function (Blueprint $table) {
			$table->increments('id');
			$table->integer('fk_id_image')->unsigned();
			$table->integer('fk_id_doctor')->unsigned();
			$table->integer('fk_landmark_x')->unsigned();
			$table->integer('fk_landmark_y')->unsigned();
			$table->foreign('fk_id_image')->references('id')->on('images')->onDelete('cascade');
			$table->foreign('fk_id_doctor')->references('id')->on('users')->onDelete('cascade');
			$table->foreign('fk_landmark_x')->references('id_landmark')->on('landmarks')->onDelete('cascade');
			$table->foreign('fk_landmark_y')->references('id_landmark')->on('landmarks')->onDelete('cascade');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('image_landmarks');
	}
}
