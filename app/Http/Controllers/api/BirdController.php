<?php

namespace App\Http\Controllers\api;


use App\Http\Controllers\Controller;
use App\Http\Requests\BirdRequest;
use App\models\Bird;
use App\Notifications\PushNewBird;
use App\Notifications\PushUpdateBird;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Notification;

class BirdController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Bird::with('sellers')->orderBy('price')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(BirdRequest $request)
    {
        $params          = $request->all();
        $params['image'] = null;

        // none image
        if ($request->image != "null") {
            $path            = $request->file('image')->store('birds');
            $params['image'] = $path;
        }

        $bird = Bird::create($params);

        // set relationships bird -> sellers
        $sellers = $request->input('sellers');
        if ($sellers) {
            $bird->sellers()->attach(explode(',', $sellers));
        }

        // send notification: new bird added
        Notification::send(User::all(), new PushNewBird);

        return $bird;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $bird = Bird::with('sellers')->find($id);

        // 404
        if (!$bird) {
            return response()->json([])->setStatusCode(404);
        }

        return $bird;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Bird $bird)
    {
        $params = $request->all();

        /* --- IMAGE --- */
        if ($request->file('image')) {
            // image is set
            unset($params['image']); // delete image from params
            Storage::delete($bird->image); // delete old image
            $params['image'] = $request->file('image')->store('birds');
        }
        // else image path is old
        /* --- IMAGE --- */

        // set relationships bird -> sellers
        $sellers = $request->input('sellers');
        if ($sellers) {
            // update sellers during pivot table
            $bird->sellers()->sync(explode(',', $sellers));
        }

        // send notification: some bird updated
        Notification::send(User::all(), new PushUpdateBird());

        return $bird->update($params); // U{^DAT#
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return bool
     */
    public function destroy(Bird $bird): bool
    {
        // delete bird->seller relationship
        $bird->sellers()->detach();
        return $bird->delete();
    }
}
