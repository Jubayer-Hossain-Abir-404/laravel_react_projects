<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PlanRequest;
use App\Repositories\PlanRepository;
use App\Services\PlanService;
use Illuminate\Http\Request;
use Illuminate\Http\Response as Res;

class PlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct(private PlanRepository $repository, private PlanService $service)
    {
    }

    public function index()
    {
        return response()->json(['data' => $this->repository->getList()], Res::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PlanRequest $request)
    {
        $data = $this->service->save($request);

        return response()->json([
            'message' => 'Plan created successfully',
            'data' => $data,
        ], !empty($data) ? Res::HTTP_CREATED : Res::HTTP_INTERNAL_SERVER_ERROR);
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
}
