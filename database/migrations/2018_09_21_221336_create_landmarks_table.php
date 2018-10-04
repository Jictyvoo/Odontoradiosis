<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLandmarksTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('landmarks', function (Blueprint $table) {
			$table->increments('id_landmark');
			$table->integer('Ba')->nullable();
			$table->integer('S')->nullable();
			$table->integer('N')->nullable();
			$table->integer('ENA')->nullable();
			$table->integer('ENP')->nullable();
			$table->integer('A')->nullable();
			$table->integer('PB')->nullable();
			$table->integer('Pr')->nullable();
			$table->integer('Id')->nullable();
			$table->integer('Pog')->nullable();
			$table->integer('Gn')->nullable();
			$table->integer('Me')->nullable();
			$table->integer('D')->nullable();
			$table->integer('Bo')->nullable();
			$table->integer('Ar')->nullable();
			$table->integer('Po')->nullable();
			$table->integer('Pt')->nullable();
			$table->integer('E')->nullable();
			$table->integer('Men')->nullable();
			$table->integer('Co')->nullable();
			$table->integer('Pn')->nullable();
			$table->integer('Cm')->nullable();
			$table->integer('SnX')->nullable();
			$table->integer('Ls')->nullable();
			$table->integer('Sts')->nullable();
			$table->integer('Pg')->nullable();
			$table->integer('pm')->nullable();
			$table->integer('ad')->nullable();
			$table->integer('bl')->nullable();
			$table->integer('bf')->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('landmarks');
	}
}
