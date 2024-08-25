<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response as Res;
use App\Models\Plan;
use App\Services\PaymentService;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct(private PaymentService $service)
    {
    }
    public function index()
    {
        //
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function checkout(Plan $plan)
    {
        $data = $this->service->save($plan);
        return response()->json(
            [
                'data' => $data,
                'message' => 'CheckOut Successful'
            ], 
        Res::HTTP_OK);
    }

    public function success(Request $request)
    {
        $data = $this->service->success($request->session_id);
        
        return response()->json(
            [
                'data' => $data,
                'message' => !empty($data) ? 'Payment Successful' : 'Payment Failed'
            ],
            !empty($data) ? Res::HTTP_OK : Res::HTTP_BAD_REQUEST
        );
    }

    public function cancel()
    {
        $this->service->cancel();

        return response()->json(
            [
                'message' => 'Payment Cancelled'
            ],
            Res::HTTP_OK
        );
    }
}
