<?php

namespace App\Services;

use App\Http\Requests\PlanRequest;
use App\Repositories\PlanRepository;
use Illuminate\Support\Facades\DB;
use Stripe\StripeClient;
use Symfony\Component\CssSelector\Exception\InternalErrorException;

class PlanService
{
    /**
     * Create a new class instance.
     */
    protected $stripe;

    public function __construct(StripeClient $stripe, private PlanRepository $repository)
    {
        $this->stripe = $stripe;
    }

    public function save(PlanRequest $request)
    {
        DB::beginTransaction();
        try {
            $plan = $this->stripe->prices->create([
                'currency' => 'usd',
                'unit_amount' => $request->price * 100,
                'recurring' => [
                    'interval' => $request->interval,
                    'trial_period_days' => $request->trial_period_days,
                ],
                'product_data' => ['name' => $request->name],
                'lookup_key' => str()->snake($request->name),
            ]);
            if ($plan && $plan->active) {
                $newPlan = $this->repository->save($request, $plan);
                DB::commit();

                return $newPlan;
            }
            DB::rollBack();

            return [];
        } catch (\Exception $e) {
            DB::rollBack();
            throw new InternalErrorException($e->getMessage());
        }
    }
}
