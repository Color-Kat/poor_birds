<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\models\Bird;
use App\models\Seller;
use App\Notifications\PushNewSeller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Notification;

class SellerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Seller::orderBy('price')->get();
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

        // send notification: new bird added
        Notification::send(User::all(), new PushNewSeller);

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
        $seller = Seller::with(['certificate', 'birds'])->find($id);

        // 404
        if (!$seller) {
            return response()->json([])->setStatusCode(404);
        }

        $sellerBirds = $seller->birds;
        $certificate = $seller->certificate;

        // apply seller's certificate to bird
        $seller->birds->transform(function ($bird) use ($certificate) {
            return Bird::apply_certificate_to_bird($bird, $certificate);
        });

        return $seller;

//        if ($seller == null) {
//            return response()->json([
//                "status" => false,
//                "messages" => "Seller not found"
//            ])->setStatusCode(404);
//        }
//
//        return response()->json([
//            "status" => true,
//            "messages" => $seller
//        ]);
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
