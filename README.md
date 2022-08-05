## SPF.SDK

You can use the SPF.SDK to quickly develop, create wallets, initiate transactions, etc. Please check the API for details

## Install

If use npm.

```
npm install spf-test
```

Or yarn.

```
yarn spf-test
```

## How to use

```
import spf from 'spf-test'

const wallet = spf.web3NewWallet()
console.log(wallet)
=> {
        "account":
        {
            "address": "0x18C857ce162f2d2a686c16d2b86C01cc75bc68Af",

            "privateKey": "0xd7d1a5d252bc2acfd38481fe52bb9f58a71da1594238e249859876d94709c03d"
        },
        "keyStore": {
            "version": 3,
            "id": "bc971754-9600-49e2-95f1-f29bcc2e2614",
            "address": "18c857ce162f2d2a686c16d2b86c01cc75bc68af",
            "crypto":
            {
                "ciphertext": "63739204ae58bda78c36e864816eaa8822a0f55e9f84f1812a91f73455500cf9",
                "cipherparams": {
                    "iv": "43345fe644b3f32d998fafcb135678dd"
                },
                "cipher": "aes-128-ctr",
                "kdf": "scrypt",
                "kdfparams": {
                    "dklen": 32,
                    "salt": "4ecfccbb37a7067b4d330ca26fbee7b74dafa1c3a17b5b776769b6dc7a3d9ab5",
                    "n": 8192,
                    "r": 8,
                    "p": 1
                },
                "mac": "e610650d89a8a2b3e5d9b8fe58e413fce687313c58f665a6f4a2c6fdf797ad36"
            }
        }
    }
```