<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBezierPointsTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('bezier_points', function (Blueprint $table) {
			$table->increments('id');
			$table->integer('x1');
			$table->integer('y1');
			$table->integer('cx1');
			$table->integer('cy1');
			$table->integer('cx2');
			$table->integer('cy2');
			$table->integer('x2')->nullable();
			$table->integer('y2')->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('bezier_points');
	}
}
