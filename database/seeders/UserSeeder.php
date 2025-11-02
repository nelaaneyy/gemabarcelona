<?php

namespace Database\Seeders;


use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Ketua RT 031',
            'email' => 'rt031@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'rt',
        ]);

        User::create([
            'name' => 'Lurah',
            'email' => 'lurah@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'lurah',
        ]);
    }
}
