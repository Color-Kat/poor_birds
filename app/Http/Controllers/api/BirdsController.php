<?php

namespace App\Http\Controllers\api;


use App\Http\Controllers\Controller;
use App\Http\Requests\BirdsRequest;
use App\models\Bird;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BirdsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Bird::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(BirdsRequest $request)
    {
//        dd($request->file('image'));
        $path = $request->file('image')->store('birds');
//

        $params = $request->all();
//        $params['image'] = $path;

        return Bird::create($params);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $bird = Bird::find($id);

        if ($bird == null) {
            return response()->json([
                "status" => false,
                "messages" => "Bird not found"
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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
