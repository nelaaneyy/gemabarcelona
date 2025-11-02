@extends('layouts.app')

@section('content')
<div class="container mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-4">Dashboard Lurah</h1>
    <p>Halo, {{ Auth::user()->name }} 👋</p>
    <p>Kamu bisa pantau dan tindak lanjut laporan berskala besar.</p>

    <a href="{{ route('logout') }}" 
       onclick="event.preventDefault(); document.getElementById('logout-form').submit();" 
       class="text-blue-500 underline">Logout</a>

    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="hidden">
        @csrf
    </form>
</div>
@endsection
