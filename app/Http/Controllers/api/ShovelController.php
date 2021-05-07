<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\models\Shovel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ShovelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Shovel::orderBy('price')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $params          = $request->all();
        $params['image'] = null;

        // none image
        if ($request->image != "null") {
            $path            = $request->file('image')->store('shovels');
            $params['image'] = $path;
        }

        if($request->price == "null ") $params['price'] = null;

        $shovel = Shovel::create($params);

        return $shovel;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Shovel $shovel)
    {
        if ($shovel == null) {
            return response()->json([
                "status"   => false,
                "messages" => "Shovel not found"
            ])->setStatusCode(404);
        }

        return response()->json([
            "status"   => true,
            "messages" => $shovel
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Shovel $shovel)
    {
        $params = $request->all();

        /* --- IMAGE --- */
        if ($request->file('image')) {
            // image is set
            unset($params['image']); // delete image from params
            Storage::delete($shovel->image); // delete old image
            $params['image'] = $request->file('image')->store('shovels');
        }
        // else image path is old
        if($request->price == 0) $params['price'] = null;

        return $shovel->update($params); // U{^DAT#
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Shovel $shovel)
    {
        return $shovel->delete();
    }
}
