<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use NotificationChannels\WebPush\WebPushMessage;
use NotificationChannels\WebPush\WebPushChannel;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class PushFinesBlock extends Notification
{

    use Queueable;


    public function via($notifiable)
    {
        return [WebPushChannel::class];
    }

    public function toWebPush($notifiable, $notification)
    {
        return (new WebPushMessage)
            ->title('Poor birds')
            ->icon('/logo.png')
            ->body('Вашу ферму закрыли из-за неоплаченных штрафов. Погасите их')
            ->action('Погасить', 'open');
    }

}
