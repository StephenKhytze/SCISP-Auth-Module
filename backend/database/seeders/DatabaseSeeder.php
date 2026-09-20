<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Student Account
        User::updateOrCreate(
            ['username' => 'DelaCruz_Juan_C1234'],
            [
                'first_name' => 'Juan',
                'last_name' => 'Dela Cruz',
                'email' => 'juan.delacruz@abc.edu.ph',
                'password' => \Illuminate\Support\Facades\Hash::make('secretpassword123'),
                'role' => 'student',
                'department' => 'College of Computer Studies',
                'id_number' => '2023-00123',
                'status' => 'active',
            ]
        );

        // 2. Faculty Account
        User::updateOrCreate(
            ['username' => 'Santos_Maria_F4021'],
            [
                'first_name' => 'Maria',
                'last_name' => 'Santos',
                'email' => 'maria.santos@abc.edu.ph',
                'password' => \Illuminate\Support\Facades\Hash::make('secretpassword123'),
                'role' => 'faculty',
                'department' => 'Faculty of Computer Studies',
                'id_number' => 'FAC-4021',
                'status' => 'active',
            ]
        );

        // 3. Administrator Account
        User::updateOrCreate(
            ['username' => 'Admin_User_00001'],
            [
                'first_name' => 'Alejandro',
                'last_name' => 'Reyes',
                'email' => 'admin@abc.edu.ph',
                'password' => \Illuminate\Support\Facades\Hash::make('secretpassword123'),
                'role' => 'administrator',
                'department' => 'Office of the Dean',
                'id_number' => 'ADM-0091',
                'status' => 'active',
            ]
        );

        // 4. Superadmin Account
        User::updateOrCreate(
            ['username' => 'SuperAdmin_User_00001'],
            [
                'first_name' => 'Marco',
                'last_name' => 'Torres',
                'email' => 'superadmin@abc.edu.ph',
                'password' => \Illuminate\Support\Facades\Hash::make('secretpassword123'),
                'role' => 'superadmin',
                'department' => 'IT Infrastructure & Security',
                'id_number' => 'SA-0001',
                'status' => 'active',
            ]
        );
    }
}
