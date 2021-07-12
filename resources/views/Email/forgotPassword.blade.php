@component('mail::message')
# Изменить пароль


@component('mail::button', ['url' => 'http://localhost:4200/update-password?token='.$token])
Изменить пароль
@endcomponent

Спасибо,<br>
Бедные птички
{{--{{ config('app.name') }}--}}
@endcomponent
