@component('mail::message')
# Изменить пароль

@component('mail::button', ['url' => 'http://127.0.0.1:8000/auth/update_password?token='.$token])
Изменить пароль
@endcomponent

Спасибо,<br>
Бедные птички
@endcomponent
