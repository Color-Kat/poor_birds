<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BirdRequest;
use App\models\Bird;
use App\models\Seller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SellerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Seller::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $params = $request->all();
        $params['image'] = null;

        // non image
        if($request->image != "null") {
            $path = $request->file('image')->store('sellers');
            $params['image'] = $path;
        }

        return Seller::create($params);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $bird = Seller::find($id);

        if ($bird == null) {
            return response()->json([
                "status" => false,
                "messages" => "Seller not found"
            ])->setStatusCode(404);
        }

        return response()->json([
            "status" => true,
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
    public function update(Request $request, Seller $seller)
    {
        $params = $request->all();

        /* --- IMAGE --- */
        if($request->file('image')) {
            // image is set
            unset($params['image']); // delete image from params
            Storage::delete($seller->image); // delete old image
            $params['image'] = $request->file('image')->store('sellers');
        }
        // else image path is old
        /* --- IMAGE --- */

        return $seller->update($params); // U{^DAT#
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Seller::destroy($id);
    }
}
