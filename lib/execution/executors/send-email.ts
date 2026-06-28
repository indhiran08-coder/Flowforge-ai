import type { NodeExecutor, SendEmailNodeData } from "../types";
import { resolveTemplate } from "../template";

export const sendEmailExecutor: NodeExecutor = async ({ node, inputData, allOutputs }) => {
  const data = node.data as SendEmailNodeData;

  const apiKey = data.apiKey ?? process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { success: false, error: "Resend API key is required. Add it in the node config or set RESEND_API_KEY env var." };
  }

  const to = resolveTemplate(data.to ?? "", inputData, allOutputs);
  const subject = resolveTemplate(data.subject ?? "(no subject)", inputData, allOutputs);
  const body = resolveTemplate(data.body ?? "", inputData, allOutputs);

  if (!to) return { success: false, error: "Recipient email (to) is required" };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "FlowForge <onboarding@resend.dev>",
        to: [to],
        subject,
        html: body.includes("<") ? body : `<p>${body.replace(/\n/g, "<br>")}</p>`,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result?.message ?? `Resend error ${response.status}` };
    }

    return {
      success: true,
      data: {
        emailId: result.id,
        to,
        subject,
        sentAt: new Date().toISOString(),
      },
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Email send failed",
    };
  }
};
