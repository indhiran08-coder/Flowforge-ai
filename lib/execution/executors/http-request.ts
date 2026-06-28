import type { NodeExecutor, HttpRequestNodeData } from "../types";
import { resolveTemplate } from "../template";

export const httpRequestExecutor: NodeExecutor = async ({ node, inputData, allOutputs }) => {
  const data = node.data as HttpRequestNodeData;

  const url = resolveTemplate(data.url ?? "", inputData, allOutputs);
  const method = data.method ?? "GET";

  if (!url) return { success: false, error: "URL is required" };

  try {
    // Resolve headers
    let headers: Record<string, string> = { "Content-Type": "application/json" };
    if (data.headers) {
      try {
        const raw = JSON.parse(resolveTemplate(data.headers, inputData, allOutputs));
        headers = { ...headers, ...raw };
      } catch {
        // ignore malformed headers
      }
    }

    // Resolve body
    let body: string | undefined;
    if (data.body && method !== "GET" && method !== "DELETE") {
      body = resolveTemplate(data.body, inputData, allOutputs);
    }

    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    const contentType = response.headers.get("content-type") ?? "";
    let responseData: unknown;

    if (contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    return {
      success: response.ok,
      data: {
        statusCode: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: responseData,
      },
      error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Request failed",
    };
  }
};
