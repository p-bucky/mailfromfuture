/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/letter.json`.
 */
export type Letter = {
  "address": "HKth2MF3hxUmwBis4xSiw7jC6duX4LQrRYd2JRvQ1Z4n",
  "metadata": {
    "name": "letter",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createLetter",
      "discriminator": [
        105,
        124,
        226,
        159,
        194,
        16,
        57,
        90
      ],
      "accounts": [
        {
          "name": "letterEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "title"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "message",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "letterState",
      "discriminator": [
        207,
        59,
        5,
        175,
        83,
        185,
        103,
        225
      ]
    }
  ],
  "types": [
    {
      "name": "letterState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "message",
            "type": "string"
          }
        ]
      }
    }
  ]
};
