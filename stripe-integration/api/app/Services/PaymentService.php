<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Stripe\StripeClient;
use Symfony\Component\CssSelector\Exception\InternalErrorException;
use App\Models\Plan;
use App\Repositories\OrderRepository;
use App\Models\Order;
use App\Models\User;

class PaymentService
{
    /**
     * Create a new class instance.
     */
    protected $stripe;

    public function __construct(StripeClient $stripe, private OrderRepository $repository)
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
            $this->repository->save($session);
            DB::commit();

            return $session->url;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new InternalErrorException($e->getMessage());
        }
    }

    public function success($sessionId)
    {
        DB::beginTransaction();
        try {
            $order = Order::where('session_id', $sessionId)->first();
            $user = User::find(auth()->user()->id);
            $checkOutSession = $this->stripe->checkout->sessions->allLineItems($sessionId);
            $plan = Plan::where('stripe_plan_id', $checkOutSession->data[0]->price->id)->first();
            if (!$order || !$checkOutSession || !$plan) {
                $user->update(
                    ['plan_id' => null]
                );
                return [];
            }

            if ($order->status === config('common.UNPAID_ORDER_STATUS')) {
                $order->update(
                    ['status' => config('common.PAID_ORDER_STATUS')]
                );

                $user->update(
                    ['plan_id' => $plan->id]
                );
            }

            DB::commit();
            return $order;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new InternalErrorException($e->getMessage());
        }
    }

    public function cancel()
    {
        DB::beginTransaction();
        try {
            $user = User::find(auth()->user()->id);
            $user->update(
                ['plan_id' => null]
            );
            DB::commit();
            return $user;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new InternalErrorException($e->getMessage());
        }
    }
}
