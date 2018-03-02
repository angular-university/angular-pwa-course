


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


