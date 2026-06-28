import type { NodeExecutor, AiChatNodeData } from "../types";
import { resolveTemplate } from "../template";

export const aiChatExecutor: NodeExecutor = async ({ node, inputData, allOutputs }) => {
  const data = node.data as AiChatNodeData;

  const apiKey = data.apiKey ?? process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { success: false, error: "OpenAI API key is required. Add it in the node config or set OPENAI_API_KEY env var." };
  }

  const model = data.model ?? "gpt-4o-mini";
  const systemPrompt = resolveTemplate(data.systemPrompt ?? "You are a helpful assistant.", inputData, allOutputs);
  const userMessage = resolveTemplate(data.userMessage ?? "{{$input.message}}", inputData, allOutputs);

  if (!userMessage) return { success: false, error: "User message is empty" };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: data.temperature ?? 0.7,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return { success: false, error: err?.error?.message ?? `OpenAI error ${response.status}` };
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content ?? "";

    return {
      success: true,
      data: {
        message: content,
        model: result.model,
        usage: result.usage,
        finishReason: result.choices?.[0]?.finish_reason,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "OpenAI request failed",
    };
  }
};
