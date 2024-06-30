<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|max:255',
            'price' => 'required|numeric',
            'interval' => 'required|max:255',
            'trial_period_days' => 'nullable|integer',
            'stripe_plan_id' => 'nullable|max:255',
            'lookup_key' => 'nullable|max:255',
        ];
    }
}
