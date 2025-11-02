<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        if (!auth()->check()) {
        return redirect()->route('login');
    }

    if ($request->user()->hasVerifiedEmail()) {
        return redirect()->intended('/dashboard');
    }

    return Inertia::render('Auth/VerifyEmail');
    }
}
