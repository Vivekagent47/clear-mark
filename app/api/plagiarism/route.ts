import OpenAI from "openai";
import { env } from "@/data/env/server";

export async function POST(req: Request) {
  const { text } = await req.json();

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(JSON.stringify({ result: "Error: " + error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
