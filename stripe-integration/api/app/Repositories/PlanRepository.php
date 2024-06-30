<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Http\Requests\PlanRequest;
use App\Models\Plan;

class PlanRepository implements Repository
{
    public function paginate(array $filters = [])
    {

    }

    public function save(PlanRequest $request, $plan)
    {
        $newPlan = new Plan();
        $newPlan->name = $request->name;
        $newPlan->price = $plan->unit_amount_decimal;
        $newPlan->interval = $request->interval;
        $newPlan->trial_period_days = $request->trial_period_days;
        $newPlan->stripe_plan_id = $plan->id;
        $newPlan->lookup_key = $plan->lookup_key;
        $newPlan->save();

        return $newPlan;
    }

    public function getList()
    {
        return Plan::all();
    }
}
