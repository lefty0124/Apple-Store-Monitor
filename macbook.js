const got = require("got");
const webhook = require("webhook-discord");
const sound = require("sound-play");
const path = require("path");
const filePath = path.join(__dirname, "sound.mp3");


const Hook = new webhook.Webhook("https://discord.com/api/webhooks/542199823248523274/nIwzlplyyO0Ldum9DYAEGhArdAFY8GfKo6gC2jjkOW6yZWf0KuObfQ1y4VDya73tiJeT")



setInterval(function() {

    got.get('https://www.apple.com/shop/fulfillment-messages?parts.0=MK1A3LL%2FA&parts.1=MK1H3LL%2FA&mt=regular&store=R086&_=1635304887261', { responseType: 'json' })
        .then(res => {
            const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            console.log('Status Code:', res.statusCode);

            let availableForPickup = res.body.body.content.pickupMessage.stores[0].partsAvailability["MK1A3LL/A"].pickupSearchQuote;
            let availableForPickup2 = res.body.body.content.pickupMessage.stores[0].partsAvailability["MK1A3LL/A"].storePickupQuote;

            console.log(headerDate + ": " + availableForPickup);

            if (availableForPickup !== 'Unavailable for Pickup' || availableForPickup2 !== 'Currently unavailable at Apple La Encantada') {
                Hook.success("MacBook Pro Stock", "[Order Now](https://www.apple.com/shop/buy-mac/macbook-pro/16-inch-space-gray-10-core-cpu-32-core-gpu-1tb#)")
                sound.play(filePath);
            }
        })
        .catch(err => {
            console.log('Error: ', err.message);
        });
}, 2500);