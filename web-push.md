


## How To show the Allow Notifications Dialog

If by accident we click "Deny" in the Allow Notifications dialog after hitting subscribe,

In order to trigger again the Allow Notifications popup, we need first to clear localhost from this list - [chrome://settings/content/notifications](chrome://settings/content/notifications)


## Generating VAPID keys

In order to generate a public/private VAPID key pair, we first need to install the [web-push](https://github.com/web-push-libs/web-push) library globally:


    npm install web-push -g


We can then generate a VAPID key pair with this command:

    web-push generate-vapid-keys --json

And here is a sample output of this command:

```json
    {
        "publicKey": "BF1BhDhSW89yKw6pWbLlzcDpCR3I3ViSCEiS_z0q_RP9-ablo5Up8HDIEP1-GauARtU7MxB6Yl_7FI8UvczPmaQ",
        "privateKey": "6XaIXj1cbSoaCpxSbOA-xYWHSISVSMCPUcSvEcczxkg"
    }
```


## Sending notifications from the command line

In order to send a notification from the command line, we need a subscription object. This can be taken either from the browser console log,
or from the server log after hitting the Subscribe button.


```json

{
    "endpoint"
:
    "https://fcm.googleapis.com/fcm/send/e01LgR2AIOI:APA91bF49I_05Dd5jplt6Wp-zAwNL6cENVw-rqqNvReD_fbQj3bJyjA54ENnK5GMK8KLde03hfrVKjZJPUkvDLow1h8aHI4uklsCiamKgUI7MF22SJM2cBF2l-Hhqgfo_ii8e0Soppsf",
    "expirationTime":  null,
    "keys":
    {
        "p256dh": "BHloQ71iy3_rZRz6oy10BkJ8PeDoC0YBoYaqRGk8BCSyxFrFmtTRSIS-duN58Wia2hsud7ucBTCxW-1Tg1sdvP0=",
        "auth": "ItYAQeYs48zLuJZ4r6-MBQ=="
    }
}
```




    web-push send-notification --endpoint=https://fcm.googleapis.com/fcm/send/e01LgR2AIOI:APA91bF49I_05Dd5jplt6Wp-zAwNL6cENVw-rqqNvReD_fbQj3bJyjA54ENnK5GMK8KLde03hfrVKjZJPUkvDLow1h8aHI4uklsCiamKgUI7MF22SJM2cBF2l-Hhqgfo_ii8e0Soppsf --key=BHloQ71iy3_rZRz6oy10BkJ8PeDoC0YBoYaqRGk8BCSyxFrFmtTRSIS-duN58Wia2hsud7ucBTCxW-1Tg1sdvP0= --auth=ItYAQeYs48zLuJZ4r6-MBQ== --payload='{"body":"Newsletter Available!","icon":"assets/main-page-logo-small-hat.png","vibrate":[100,50,100],"data":{"dateOfArrival":1515490543280,"primaryKey":"-push-notification"},"actions":[{"action":"explore","title":"Go to the site"},{"action":"close","title":"Close the notification"}]}'  --vapid-pubkey=BIvC8I6yoFc-DZNgFTANsy9cae80mjWzTym7aB5zY45vBVZQK9VureFHvoh5ijW8EKG2I-g1YaN5rcKe_5AYrvM --vapid-pvtkey=Xox-dZU4rnLLkRlE5EzblVUrI3LbYj3a719F0a87UWI --vapid-subject=mailto:example@yourdomain.org
