import {mapGetters} from "vuex";
import store from './store';

export function initSW() {
    if (!"serviceWorker" in navigator) {
        //service worker isn't supported
        return;
    }

    //register the service worker
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log("Service worker successfully registered", registration);
            initPush();
        })
        .catch((error) => {
            console.log("Service worker registration failed", error);
        });
}

export function initPush() {
    if (!"PushManager" in window) {
        return;  //push isn't supported
    }

    if (!navigator.serviceWorker.ready) {
        return;
    }

    new Promise(function (resolve, reject) {
        const permissionResult = Notification.requestPermission(result => {
            resolve(result);
        });

        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    })
        .then((permissionResult) => {
            if (permissionResult !== 'granted') {
                throw new Error('We weren\'t granted permission.');
            }
            subscribeUser();
        });
}


function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64  = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData     = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function subscribeUser() {
    navigator.serviceWorker.ready
        .then((registration) => {
            const subscribeOptions = {
                userVisibleOnly     : true,
                applicationServerKey: urlBase64ToUint8Array(
                    'BA-ekFbjqzrZAps8Ys6g3UT6f0GTV468jagZh_gpZ_l51om1jMB4ecbNnbC9UQU2hhSUKXPhMEnEwEzxrSGSpIQ'
                )
            };

            return registration.pushManager.subscribe(subscribeOptions);
        })
        .then((pushSubscription) => {
            console.log('Received PushSubscription: ', pushSubscription);
            storePushSubscription(pushSubscription);
        });
}

async function storePushSubscription(pushSubscription) {
    const token = document.querySelector('meta[name=csrf-token]')?.getAttribute('content');

    await setTimeout(async ()=> {
        return await fetch('/push', {
            method : 'POST',
            body   : JSON.stringify(pushSubscription),
            headers: {
                'Accept'       : 'application/json',
                'Content-Type' : 'application/json',
                'X-CSRF-Token' : token,
                'Authorization': `Bearer ${store.getters.getToken}`
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                // console.log(res);
                if(res.success) return true;

            })
            .catch((err) => {
                console.log(err)
            });
    }, 1000)

}
