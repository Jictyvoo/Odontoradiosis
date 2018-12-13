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
		for ($index = 1; $index < 76; $index += 1) {
			DB::table('images')->insert(['id' => $index, 'path' => 'radiography/' . $index . '.jpg', 'created_at' => (new \DateTime())->format('Y-m-d H:i:s'), 'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')]);
		}
	}
}
