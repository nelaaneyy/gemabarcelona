@extends('layouts.app')

@section('content')
<div class="container mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-4">Dashboard RT</h1>
    <p>Halo, {{ Auth::user()->name }} 👋</p>
    <p>Kamu bisa kelola laporan warga dan ubah status pengaduan.</p>

    <a href="{{ route('logout') }}" 
       onclick="event.preventDefault(); document.getElementById('logout-form').submit();" 
       class="text-blue-500 underline">Logout</a>

    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="hidden">
        @csrf
    </form>
</div>
@endsection
