<?php

namespace App\Http\Controllers;

use App\Models\ActiveUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ActiveUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $activeUsers = ActiveUser::with('user')->where('user_id', '!=', Auth::user()->id)->latest()->paginate(10);

        return response()->json($activeUsers);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ActiveUser $activeUser)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ActiveUser $activeUser)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ActiveUser $activeUser)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ActiveUser $activeUser)
    {
        //
    }
}
