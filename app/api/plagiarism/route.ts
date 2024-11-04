import type { NextApiRequest } from "next";
import OpenAI from "openai";
import { env } from "@/data/env/server";

export async function POST(req: NextApiRequest) {
  if (req.method === "POST") {
    const { text } = req.body;

    const openai = new OpenAI({
      apiKey: env.OPEN_AI_API,
    });

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: text }],
      });

      return new Response(
        JSON.stringify({ result: response.choices[0].message.content }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    } catch (error: any) {
      return new Response(
        JSON.stringify({ result: "Error: " + error.message }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
  } else {
    throw new Error("Method not allowed");
  }
}
