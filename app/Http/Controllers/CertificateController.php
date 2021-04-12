<?php

namespace App\Http\Controllers;

use App\models\Certificate;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Certificate::get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        return Certificate::create($request->all);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $certificate = Certificate::find($id);

        if ($certificate == null) {
            return response()->json([
                "status" => false,
                "messages" => "Certificate not found"
            ])->setStatusCode(404);
        }

        return response()->json([
            "status" => true,
            "messages" => $certificate
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return bool
     */
    public function update(Request $request, Certificate $certificate)
    {
        return $certificate->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return int
     */
    public function destroy($id)
    {
        return Certificate::destroy($id);
    }
}
