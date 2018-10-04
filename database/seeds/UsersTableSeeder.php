<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder {
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run() {
		DB::table('users')->insert(['name' => 'Admin_Root', 'email' => 'admin@odontoradiosis.com', 'password' => bcrypt('root@pass'), 'access_level' => 1, 'cpf' => '00000000000', 'created_at' => (new \DateTime())->format('Y-m-d H:i:s'), 'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')]);
		DB::table('users')->insert(['name' => 'Doctor_Test', 'email' => 'testdoctor@odontoradiosis.com', 'password' => bcrypt('doctor_test@pass'), 'access_level' => 0, 'cpf' => '00000000000', 'created_at' => (new \DateTime())->format('Y-m-d H:i:s'), 'updated_at' => (new \DateTime())->format('Y-m-d H:i:s')]);
	}
}
