export type Mailfromfuture = {
  address: "BZ46sZ2iejuwJjZ7Ga4P7B8y7EDXmAWpKjHAAowufAg8";
  metadata: {
    name: "mailfromfuture";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "create";
      discriminator: [24, 30, 200, 40, 5, 28, 7, 119];
      accounts: [
        {
          name: "mail";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 117, 110, 116, 101, 114];
              }
            ];
          };
        }
      ];
      args: [
        {
          name: "text";
          type: "string";
        },
        {
          name: "unlockAfter";
          type: "u16";
        }
      ];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "mail";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 117, 110, 116, 101, 114];
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "mail";
      discriminator: [196, 146, 111, 84, 164, 209, 23, 235];
    }
  ];
  types: [
    {
      name: "mail";
      type: {
        kind: "struct";
        fields: [
          {
            name: "text";
            type: "string";
          },
          {
            name: "unlockAfter";
            type: "u16";
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    }
  ];
};

export const IDL: Mailfromfuture = {
  address: "BZ46sZ2iejuwJjZ7Ga4P7B8y7EDXmAWpKjHAAowufAg8",
  metadata: {
    name: "mailfromfuture",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  instructions: [
    {
      name: "create",
      discriminator: [24, 30, 200, 40, 5, 28, 7, 119],
      accounts: [
        {
          name: "mail",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [99, 111, 117, 110, 116, 101, 114],
              },
            ],
          },
        },
      ],
      args: [
        {
          name: "text",
          type: "string",
        },
        {
          name: "unlock_after",
          type: "u16",
        },
      ],
    },
    {
      name: "initialize",
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
      accounts: [
        {
          name: "user",
          writable: true,
          signer: true,
        },
        {
          name: "mail",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [99, 111, 117, 110, 116, 101, 114],
              },
            ],
          },
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "Mail",
      discriminator: [196, 146, 111, 84, 164, 209, 23, 235],
    },
  ],
  types: [
    {
      name: "Mail",
      type: {
        kind: "struct",
        fields: [
          {
            name: "text",
            type: "string",
          },
          {
            name: "unlock_after",
            type: "u16",
          },
          {
            name: "created_at",
            type: "i64",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
  ],
};
