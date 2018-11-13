<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ImagesTableSeeder extends Seeder {
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run() {
		DB::table('images')->insert(['id' => '1', 'path' => '1.jpg', 'created_at' => (new \DateTime())->format('Y-m-d H:i:s'), 'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')]);
		DB::table('images')->insert(['id' => '2', 'path' => '2.jpg', 'created_at' => (new \DateTime())->format('Y-m-d H:i:s'), 'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')]);
		DB::table('images')->insert(['id' => '3', 'path' => '3.jpg', 'created_at' => (new \DateTime())->format('Y-m-d H:i:s'), 'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')]);
	}
}
