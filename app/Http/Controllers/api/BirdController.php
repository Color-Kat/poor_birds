<?php

namespace App\Http\Controllers\api;


use App\Http\Controllers\Controller;
use App\Http\Requests\BirdRequest;
use App\models\Bird;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class BirdController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
//        dump();
        return Bird::with('sellers')->get();
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

        if ($bird == null) {
            return response()->json([
                "status"   => false,
                "messages" => "Bird not found"
            ])->setStatusCode(404);
        }

        return response()->json([
            "status"   => true,
            "messages" => $bird
        ]);
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
            // delete all sellers on bird
            $bird->sellers()->detach();

            $bird->sellers()->attach(explode(',', $sellers));
        }

        return $bird->update($params); // U{^DAT#
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Bird $bird)
    {
        // delete bird->seller relationship
        $bird->sellers()->detach();
        return $bird->delete();
    }
}
