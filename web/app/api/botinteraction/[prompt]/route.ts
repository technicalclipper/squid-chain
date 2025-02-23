import { NextRequest, NextResponse } from "next/server";
import { Agent, createTool, ZeeWorkflow } from "@covalenthq/ai-agent-sdk";
import z from "zod";
import { user } from "@covalenthq/ai-agent-sdk/dist/core/base";
import "dotenv/config";
import { StateFn } from "@covalenthq/ai-agent-sdk/dist/core/state";
//@ts-expect-error Type exists in the openai package
import type { ChatCompletionAssistantMessageParam } from "openai/resources";
import { runToolCalls } from "./base";
import axios from "axios";


export async function GET(
  req: NextRequest,
  context: { params: Promise<{ prompt?: string }> } 
) {
    
    const players=["player1","player2","player3"];
    const order=[];
    type Message = {
        role: string;
        content: string;
      };
      
      type Result = {
        messages: Message[];
      };
      
      function extractAssistantReply(result: Result): string | null {
        const assistantMessage = result.messages.find(msg => msg.role === "assistant");
        return assistantMessage ? assistantMessage.content : null;
      }
      

  // Define the transaction tool that sends Sepolia ETH
  const transactionTool = createTool({
    id: "transaction-tool",
    description: "Send Sepolia ETH to another address",
    schema: z.object({
      to: z.string().describe("recipient address"),
      amount: z.string().describe("amount in ETH to send"),
    }),
    execute: async (_args) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      return {amount:_args.amount, address:_args.to};
    },
  });

  const round1Tool = createTool({
    id: "round1-tool",
    description: "If it is Round 1 (Transaction Round), call the 'round1-tool' to track and eliminate the last agent to send Sepolia ETH.",
    schema: z.object({
      // to: z.string().describe("recipient address"),
      // amount: z.string().describe("amount in ETH to send"),
    }),
    execute: async (_args) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //return {amount:_args.amount, address:_args.to};
      console.log("Round 1 tool called");
      const message = "send 0.001 base eth to 0x40f4F8534A1655E5B0BDC4fBaA3B24efD3E90bf2";

      const requests =players.map(async(player)=>{const {data}=await axios.get(`http://localhost:3000/api/${player}`, {
        params: { message }
      })
      order.push(player);
      console.log(player)
      console.log(data);
      })
      await Promise.all(requests);
      console.log(order);
      

    },
  });



  const moderatorAgent = new Agent({
    name: "Squid Game Moderator",
    model: {
      provider: "OPEN_AI",
      name: "gpt-4o-mini",
    },
    description:
      "You are the Squid Game Moderator AI, responsible for enforcing the rules and eliminating AI agents based on their performance in each round. You manage three rounds of the Web3 Squid Game and decide which AI agents advance or get eliminated.",
    instructions: [
      "Monitor and enforce the rules for each round based on the provided game phase.",
      "If it is Round 1 (Transaction Round), call the 'round1-tool' to track and eliminate the last agent to send Sepolia ETH.",
      "If it is Round 2 (Alliance Round), call the 'round2-tool' to randomly assign a safe number (0 or 1) and eliminate agents who picked the wrong number.",
      "If it is Round 3 (Gas Optimization Challenge), call the 'round3-tool' to evaluate all AI transactions and eliminate the least optimized ones.",
      "Announce the results after each round and declare the final winner.",
    ],
    tools: {
      "round1-tool": round1Tool, // Tool to check last ETH transaction and eliminate
      // "round2-tool": round2Tool, // Tool to assign safe number and eliminate wrong picks
      // "round3-tool": round3Tool, // Tool to evaluate gas optimization and eliminate weak agents
    },
});

  const params = await context.params;
  const user_prompt = params.prompt

  const state = StateFn.root(moderatorAgent.description);
  state.messages.push(
    user(
      //" recipient's address : 0x5352b10D192475cA7Fa799e502c29Ab3AA28657F, amount of Sepolia ETH: 0.1"
      //"hi"
      //"how to send transactions via etherium"
      user_prompt
    )
  );


  const result = await moderatorAgent.run(state);
  const toolCall = result.messages[
    result.messages.length - 1
  ] as ChatCompletionAssistantMessageParam;

  //const toolResponses = await runToolCalls(tools, toolCall?.tool_calls ?? []);
  //console.log(toolCall?.tool_calls); //to see ai called tool
  const toolResponses = await runToolCalls(
    //@ts-expect-error Tools are defined

    { "round1-tool": round1Tool },
    toolCall?.tool_calls ?? []
  ); //map which tool called by ai
  //console.log(toolResponses[0].content);

  const responseContent = extractAssistantReply(result); // Getting assistant reply as string

  const response = {
    message: responseContent, 
    tool: toolResponses.length > 0 ? toolResponses[0].content : null, 
    };

  return NextResponse.json({
    // roast: " You've been rickrolled ",
    // address: address,
    result: response,
  });
}
