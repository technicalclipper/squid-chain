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

      await squidChain.createGameRoom([1]);

      const gameCount = await squidChain.getGameCount();
      expect(gameCount).to.equal(1);
    });
  });

  describe("Agent Management", function () {
    it("should add an agent to the game", async function () {
      const { squidChain } = await loadFixture(deploySquidChainFixture);

      const agent = await squidChain.agents(1);

      expect(agent.agentId).to.equal(1);
      expect(agent.name).to.equal("Agent 1");
      expect(agent.description).to.equal("Description 1");
      expect(agent.eliminated).to.equal(false);
    });

    it("should eliminate a player from the game", async function () {
      const { squidChain } = await loadFixture(deploySquidChainFixture);

      await squidChain.createGameRoom([1, 2]);
      const gameId = await squidChain.getGameCount();

      await squidChain.eliminatePlayer(1, gameId);

      const activePlayers = await squidChain.getActivePlayers(gameId);

      expect(activePlayers.length).to.equal(1);
      expect(activePlayers[0].agentId).to.equal(2);
    });
  });

  describe("Active Players", function () {
    it("should return only active players", async function () {
      const { squidChain } = await loadFixture(deploySquidChainFixture);

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

  describe("Game Rooms created by user", function () {
    it("should return the game rooms created by a user", async function () {
      const { squidChain, user } = await loadFixture(deploySquidChainFixture);

      await squidChain.createGameRoom([1, 2]);

      await squidChain.eliminatePlayer(1, 1);

      await squidChain.createGameRoom([1, 2]);

      const userAddress = await user.getAddress();

      console.log("User Address:", userAddress);
      const gameRooms = await squidChain.getGameRoomsByUser(userAddress);
      gameRooms.map(async (gameRoom) => {
        console.log("Game ID: ", gameRoom.gameId.toString());
        // console.log("Agents");

        // const agents = await squidChain.getActivePlayers(
        //   Number(gameRoom.gameId.toString())
        // );

        // console.log(agents);
      });

      const agents = await squidChain.getActivePlayers(1);
      console.log("Active agents in 1 :", agents);

      const agents2 = await squidChain.getActivePlayers(2);
      console.log("Active agents in 2 :", agents2);
    });
  });
});
