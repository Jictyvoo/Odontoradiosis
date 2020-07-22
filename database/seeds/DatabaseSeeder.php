<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder {
	/**
	 * Seed the application's database.
	 *
	 * @return void
	 */
	public function run() {
		//$real_path = realpath(__DIR__ . '/../compare_landmarks.sql');
        //DB::unprepared(file_get_contents($real_path));
		$this->call(UsersTableSeeder::class);
		$this->call(ImagesTableSeeder::class);
	}
}
