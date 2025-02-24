import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SquidChainModule = buildModule("SquidChainModule", (m) => {
  const squidChain = m.contract("SquidChain");

  return { squidChain };
});

export default SquidChainModule;
