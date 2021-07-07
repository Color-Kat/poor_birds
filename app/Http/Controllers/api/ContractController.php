<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\models\Contract;
use App\models\Shovel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ContractController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Contract::orderBy('price')->get();
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Contract
     */
    public function show(Contract $contract): Contract
    {
        // 404
        if (!$contract) {
            return response()->json([])->setStatusCode(404);
        }

        return $contract;
    }
}
