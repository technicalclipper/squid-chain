import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("SquidChain", function () {
  // Deploy the SquidChain contract
  async function deploySquidChainFixture() {
    const [user] = await ethers.getSigners();
    const SquidChain = await ethers.getContractFactory("SquidChain");
    const squidChain = await SquidChain.deploy();
    return { squidChain, user };
  }

  describe("Game Room Management", function () {
    it("should create a new game room", async function () {
      const { squidChain } = await loadFixture(deploySquidChainFixture);

      await squidChain.addAgent(1, "Agent 1", "Description 1");
      await squidChain.addAgent(2, "Agent 2", "Description 2");
      await squidChain.addAgent(3, "Agent 3", "Description 3");

      const playerIds = [1, 2, 3];
      await squidChain.createGameRoom(playerIds);

      const gameId = await squidChain.getGameCount();
      console.log("Game Id:", gameId);

      const gameRoom = await squidChain.gameRooms(gameId);
      console.log("Game Room:", gameRoom);

      expect(gameRoom.gameId).to.equal(gameId);
    });

    it("should return the correct game count", async function () {
      const { squidChain } = await loadFixture(deploySquidChainFixture);

      await squidChain.addAgent(1, "Agent 1", "Description 1");
      await squidChain.createGameRoom([1]);

      const gameCount = await squidChain.getGameCount();
      expect(gameCount).to.equal(1);
    });
  });

  describe("Agent Management", function () {
    it("should add an agent to the game", async function () {
      const { squidChain } = await loadFixture(deploySquidChainFixture);

      await squidChain.addAgent(1, "Player 1", "A brave player");
      const agent = await squidChain.agents(1);

      expect(agent.agentId).to.equal(1);
      expect(agent.name).to.equal("Player 1");
      expect(agent.description).to.equal("A brave player");
      expect(agent.eliminated).to.equal(false);
    });

    it("should eliminate a player from the game", async function () {
      const { squidChain } = await loadFixture(deploySquidChainFixture);

      await squidChain.addAgent(1, "Player 1", "A brave player");
      await squidChain.addAgent(2, "Player 2", "A stealthy player");

      await squidChain.createGameRoom([1, 2]);
      const gameId = await squidChain.getGameCount();

      await squidChain.eliminatePlayer(1, gameId);

      const player1 = await squidChain.agents(1);
      expect(player1.eliminated).to.equal(true);

      const activePlayers = await squidChain.getActivePlayers(gameId);

      expect(activePlayers.length).to.equal(1);
      expect(activePlayers[0].agentId).to.equal(2);
    });
  });

  describe("Active Players", function () {
    it("should return only active players", async function () {
      const { squidChain } = await loadFixture(deploySquidChainFixture);

      await squidChain.addAgent(1, "Player 1", "A brave player");
      await squidChain.addAgent(2, "Player 2", "A stealthy player");
      await squidChain.addAgent(3, "Player 3", "A clever player");

      await squidChain.createGameRoom([1, 2, 3]);
      const gameId = await squidChain.getGameCount();

      await squidChain.eliminatePlayer(1, gameId);

      const activePlayers = await squidChain.getActivePlayers(gameId);
      console.log("Active Players:", activePlayers);

      expect(activePlayers.length).to.equal(2);
      expect(activePlayers[0].agentId).to.equal(2);
      expect(activePlayers[1].agentId).to.equal(3);
    });
  });
});
