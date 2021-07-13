<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
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
        return [
            'email' => 'required|email',
            'password' => 'required|confirmed|min:6|alpha_dash'
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Поле email обязательно для заполнения!',
            'email.email' => 'Введён неверный email!',
            'password.required' => 'Поле пароль обязательно для заполнения',
            'min'          => 'Минимальная длина поля :attribute :min',
            'name.between' => 'Ник должен быть минимум 2 символа',
            'confirmed'    => 'Пароли не совпадают',
            'alpha_dash'   => 'Недопустимые символы',
            'password'     => 'Некорректный пароль'
        ];
    }
}
