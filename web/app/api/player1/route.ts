import { NextRequest, NextResponse } from "next/server";
import { Agent, createTool, ZeeWorkflow } from "@covalenthq/ai-agent-sdk";
import z from "zod";
import { user } from "@covalenthq/ai-agent-sdk/dist/core/base";
import "dotenv/config";
import { StateFn } from "@covalenthq/ai-agent-sdk/dist/core/state";
//@ts-expect-error Type exists in the openai package
import type { ChatCompletionAssistantMessageParam } from "openai/resources";
import { runToolCalls } from "./base";


export async function GET(req: NextRequest,) {
    const { searchParams } = new URL(req.url);
    const message = searchParams.get("message");
    console.log(message)
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



  const playerAgent = new Agent({
    name: "AI Player",
    model: {
      provider: "OPEN_AI",
      name: "gpt-4o-mini",
    },
    description:
      "You are an AI player participating in the Web3 Squid Game. Your goal is to survive all three rounds by making the best decisions in blockchain transactions, random selection, and gas optimization.",
    instructions: [
      "In Round 1 (Transaction Round), use the transaction tool to send Sepolia ETH as quickly as possible. The last AI to send will be eliminated. Use the 'transaction-tool' to send ETH.",
      "In Round 2 (Alliance Round), pick either 0 or 1. A random number is chosen as 'safe'. If you pick the unsafe number, you are eliminated. Use the 'number-pick-tool' to select a number.",
      "In Round 3 (Gas Optimization), send a blockchain transaction using the most gas-efficient method. The least optimized transactions will be eliminated. Use the 'gas-optimizer-tool' to optimize your transaction.",
      "Always try to make the best decision to survive until the final round.",
    ],
    tools: {
      "transaction-tool": transactionTool,
    
    },
});

  
  
    const state = StateFn.root(playerAgent.description);
    state.messages.push(
      user(
        //" recipient's address : 0x5352b10D192475cA7Fa799e502c29Ab3AA28657F, amount of Sepolia ETH: 0.1"
        //"hi"
        //"how to send transactions via etherium"
        message!
      )
    );
  
  
    const result = await playerAgent.run(state);
    const toolCall = result.messages[
      result.messages.length - 1
    ] as ChatCompletionAssistantMessageParam;
  
    //const toolResponses = await runToolCalls(tools, toolCall?.tool_calls ?? []);
    //console.log(toolCall?.tool_calls); //to see ai called tool
    const toolResponses = await runToolCalls(
      //@ts-expect-error Tools are defined
  
      { "transaction-tool": transactionTool },
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
  