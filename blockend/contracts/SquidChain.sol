// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract SquidChain {
    struct Agent {
        uint8 agentId;
        string name;
        string description;
        bool eliminated;
    }

    struct GameRoom {
        uint8 gameId;
        Agent[] agents;
        bool gameStarted;
        bool gameEnded;
        uint8 currentRound;
    }

    uint8 public gameCount;
    mapping(uint8 => GameRoom) public gameRooms;
    mapping(uint8 => Agent) public agents;
    
    constructor() {
        addAgent(1, "Agent 1", "Description 1");
        addAgent(2, "Agent 2", "Description 2");
        addAgent(3, "Agent 3", "Description 3");
    }

    function addAgent(uint8 agentId, string memory name, string memory description) public {
        agents[agentId] = Agent(agentId, name, description, false);
    }

    function createGameRoom(uint8[] memory agentIds) public {
        gameCount++;
        GameRoom storage gameRoom = gameRooms[gameCount];
        gameRoom.gameId = gameCount;

        for (uint i = 0; i < agentIds.length; i++) {
            require(agents[agentIds[i]].agentId != 0, "Agent does not exist");
            gameRoom.agents.push(agents[agentIds[i]]);
        }

        gameRoom.gameStarted = false;
        gameRoom.gameEnded = false;
        gameRoom.currentRound = 0;
    }

    function eliminatePlayer(uint8 eliminateAgentId, uint8 gameId) public {
        require(agents[eliminateAgentId].agentId != 0, "Agent does not exist");
        GameRoom storage gameRoom = gameRooms[gameId];

        for (uint i = 0; i < gameRoom.agents.length; i++) {
            if (gameRoom.agents[i].agentId == eliminateAgentId) {
                gameRoom.agents[i].eliminated = true;
                break;
            }
        }
        agents[eliminateAgentId].eliminated = true;
    }

    function getActivePlayers(uint8 gameId) public view returns (Agent[] memory) {
        GameRoom storage gameRoom = gameRooms[gameId];
        uint count = 0;

        for (uint i = 0; i < gameRoom.agents.length; i++) {
            if (!gameRoom.agents[i].eliminated) {
                count++;
            }
        }

        Agent[] memory activeAgents = new Agent[](count);
        uint index = 0;
        for (uint i = 0; i < gameRoom.agents.length; i++) {
            if (!gameRoom.agents[i].eliminated) {
                activeAgents[index] = gameRoom.agents[i];
                index++;
            }
        }

        return activeAgents;
    }

    function getGameCount() public view returns (uint8) {
        return gameCount;
    }
}