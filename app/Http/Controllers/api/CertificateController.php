<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\models\Certificate;
use App\Notifications\PushNewCertificate;
use App\User;
use Illuminate\Http\Request;
use Notification;
use phpDocumentor\Reflection\Types\Boolean;

class CertificateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Certificate::orderBy('price')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // send notification: new bird added
        Notification::send(User::all(), new PushNewCertificate);
        return Certificate::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Certificate
     */
    public function show($id): Certificate
    {
        $certificate = Certificate::find($id);

        // 404
        if (!$certificate) {
            return response()->json([])->setStatusCode(404);
        }

        return $certificate;
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
    public function destroy(int $id): int
    {
        return Certificate::destroy($id);
    }
}
