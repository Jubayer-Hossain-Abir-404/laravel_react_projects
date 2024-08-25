<?php

declare(strict_types=1);

namespace App\Repositories;
use App\Models\Order;

class OrderRepository implements Repository
{
    public function paginate(array $filters = [])
    {

    }

    public function save($session)
    {
        $order = new Order();
        $order->status = $session->payment_status;
        $order->session_id = $session->id;
        $order->user_id = auth()->user()->id;
        $order->total_price = $session->amount_total;
        $order->save();

        return $order;
    }
}
