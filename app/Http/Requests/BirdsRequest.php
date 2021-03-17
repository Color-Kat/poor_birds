<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BirdsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'name'        => 'required|min:3|max:255',
            'description' => 'required|min:7',
            'price'       => 'required|numeric:min:0'
        ];

        if ($this->route()->named('products.store')) {
            $rules['code'] .= '|unique:products,code';
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'required' => 'Поле :attribute обязательно для заполнения',
            'min'      => 'Минимальная длина поля :attribute :min',
            'name.min' => 'Имя должно содержать минимум :min',
            'max'      => 'Максимальная длина поля :attribute :max',
        ];
    }
}
