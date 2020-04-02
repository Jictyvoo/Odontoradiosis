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
			$table->integer('Sela_S')->nullable();
			$table->integer('Nasio_N')->nullable();
			$table->integer('espinha_nasal_ENA')->nullable();
			$table->integer('espinha_nasal_ENP')->nullable();
			$table->integer('ponto_subespinhal_A')->nullable();
			$table->integer('ponto_pupramental_B')->nullable();
			$table->integer('pogonio_Pog')->nullable();
			$table->integer('gnatio_Gn')->nullable();
			$table->integer('mento_Me')->nullable();
			$table->integer('condilio_Co')->nullable();
			$table->integer('pronasal_Pn')->nullable();
			$table->integer('pogonio_mole_Pg')->nullable();
			$table->integer('palato_mole_pm')->nullable();
			$table->integer('gonio_Go')->nullable();
			$table->integer('orbitale_Or')->nullable();
			$table->integer('porio_Po')->nullable();
			$table->integer('ponta_nariz_PtN')->nullable();
			$table->integer('pterigo_maxilar_Fpm')->nullable();
			$table->integer('pterigoide_Pt')->nullable();
			/*$table->integer('Ba')->nullable();
			$table->integer('Pr')->nullable();
			$table->integer('Id')->nullable();
			$table->integer('D')->nullable();
			$table->integer('Bo')->nullable();
			$table->integer('Ar')->nullable();
			$table->integer('E')->nullable();
			$table->integer('Men')->nullable();
			$table->integer('Cm')->nullable();
			$table->integer('Sn')->nullable();
			$table->integer('Ls')->nullable();
			$table->integer('Sts')->nullable();
			$table->integer('ad')->nullable();
			$table->integer('bl')->nullable();
			$table->integer('bf')->nullable();*/
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
