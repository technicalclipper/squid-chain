export const wagmiContractConfig = {
  address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  abi: [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "agentId",
          type: "uint8",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "description",
          type: "string",
        },
      ],
      name: "addAgent",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      name: "agents",
      outputs: [
        {
          internalType: "uint8",
          name: "agentId",
          type: "uint8",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "description",
          type: "string",
        },
        {
          internalType: "bool",
          name: "eliminated",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8[]",
          name: "agentIds",
          type: "uint8[]",
        },
      ],
      name: "createGameRoom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "eliminateAgentId",
          type: "uint8",
        },
        {
          internalType: "uint8",
          name: "gameId",
          type: "uint8",
        },
      ],
      name: "eliminatePlayer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "gameCount",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      name: "gameRooms",
      outputs: [
        {
          internalType: "uint8",
          name: "gameId",
          type: "uint8",
        },
        {
          internalType: "bool",
          name: "gameStarted",
          type: "bool",
        },
        {
          internalType: "bool",
          name: "gameEnded",
          type: "bool",
        },
        {
          internalType: "uint8",
          name: "currentRound",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "gamesByUser",
      outputs: [
        {
          internalType: "uint8",
          name: "gameId",
          type: "uint8",
        },
        {
          internalType: "bool",
          name: "gameStarted",
          type: "bool",
        },
        {
          internalType: "bool",
          name: "gameEnded",
          type: "bool",
        },
        {
          internalType: "uint8",
          name: "currentRound",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "gameId",
          type: "uint8",
        },
      ],
      name: "getActivePlayers",
      outputs: [
        {
          components: [
            {
              internalType: "uint8",
              name: "agentId",
              type: "uint8",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "bool",
              name: "eliminated",
              type: "bool",
            },
          ],
          internalType: "struct SquidChain.Agent[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getGameCount",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "userAddress",
          type: "address",
        },
      ],
      name: "getGameRoomsByUser",
      outputs: [
        {
          components: [
            {
              internalType: "uint8",
              name: "gameId",
              type: "uint8",
            },
            {
              components: [
                {
                  internalType: "uint8",
                  name: "agentId",
                  type: "uint8",
                },
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "bool",
                  name: "eliminated",
                  type: "bool",
                },
              ],
              internalType: "struct SquidChain.Agent[]",
              name: "agents",
              type: "tuple[]",
            },
            {
              internalType: "bool",
              name: "gameStarted",
              type: "bool",
            },
            {
              internalType: "bool",
              name: "gameEnded",
              type: "bool",
            },
            {
              internalType: "uint8",
              name: "currentRound",
              type: "uint8",
            },
          ],
          internalType: "struct SquidChain.GameRoom[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
} as const;
