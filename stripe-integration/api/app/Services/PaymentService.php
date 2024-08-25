<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Stripe\StripeClient;
use Symfony\Component\CssSelector\Exception\InternalErrorException;
use App\Models\Plan;

class PaymentService
{
    /**
     * Create a new class instance.
     */
    protected $stripe;

    public function __construct(StripeClient $stripe)
    {
        $this->stripe = $stripe;
    }

    public function save(Plan $plan)
    {
        DB::beginTransaction();
        try {
            $lineItems = [
                [
                    'price' => $plan->stripe_plan_id,
                    'quantity' => 1,
                ]
            ];
            $session = $this->stripe->checkout->sessions->create([
                'success_url' => route('checkout.success') . '?session_id={CHECKOUT_SESSION_ID}',
                'line_items' => $lineItems,
                'mode' => 'subscription',
                'payment_method_types' => ['card'],
                'customer_email' => auth()->user()->email,
            ]);
            return $session;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new InternalErrorException($e->getMessage());
        }
    }
}
