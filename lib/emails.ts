import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;
const resend    = resendKey ? new Resend(resendKey) : null;
const FROM      = "FlowForge AI <notifications@flowforge.ai>";

/** Sends a workflow failure alert email */
export async function sendFailureAlert({
  to, userName, workflowName, executionId, errorMessage,
}: {
  to: string;
  userName: string;
  workflowName: string;
  executionId: string;
  errorMessage: string;
}) {
  if (!resend) return; // Resend not configured — skip silently
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/executions/${executionId}`;

  await resend.emails.send({
    from:    FROM,
    to,
    subject: `❌ Workflow failed: "${workflowName}"`,
    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:white;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:28px 32px;">
          <table width="100%"><tr>
            <td><span style="font-size:20px;font-weight:800;color:white;letter-spacing:-0.5px;">⚡ FlowForge AI</span></td>
            <td align="right"><span style="background:rgba(255,255,255,0.2);color:white;font-size:11px;font-weight:600;padding:4px 10px;border-radius:20px;">EXECUTION ALERT</span></td>
          </tr></table>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0f172a;">Workflow execution failed</h1>
          <p style="margin:0 0 24px;color:#64748b;font-size:15px;">Hi ${userName}, your workflow ran into an issue.</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef2f2;border:1px solid #fecaca;border-radius:12px;margin-bottom:24px;">
            <tr><td style="padding:20px;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#dc2626;text-transform:uppercase;letter-spacing:0.5px;">Failed Workflow</p>
              <p style="margin:0;font-size:18px;font-weight:700;color:#0f172a;">${workflowName}</p>
            </td></tr>
          </table>

          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:28px;">
            <tr><td style="padding:20px;">
              <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Error Message</p>
              <p style="margin:0;font-size:13px;color:#334155;font-family:monospace;line-height:1.6;word-break:break-all;">${errorMessage.slice(0, 300)}${errorMessage.length > 300 ? "…" : ""}</p>
            </td></tr>
          </table>

          <a href="${url}" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:white;font-size:14px;font-weight:600;padding:12px 24px;border-radius:10px;text-decoration:none;">
            View Execution Logs →
          </a>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:20px 32px;border-top:1px solid #f1f5f9;background:#f8fafc;">
          <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
            You're receiving this because you have failure alerts enabled.<br>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings" style="color:#6366f1;text-decoration:none;">Manage notification settings</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });
}

/** Sends a weekly digest email */
export async function sendWeeklyDigest({
  to, userName, stats,
}: {
  to: string;
  userName: string;
  stats: { totalRuns: number; successRate: number; topWorkflow: string };
}) {
  if (!resend) return; // Resend not configured — skip silently
  await resend.emails.send({
    from:    FROM,
    to,
    subject: `📊 Your FlowForge AI weekly digest`,
    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:white;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;">
        <tr><td style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:28px 32px;">
          <span style="font-size:20px;font-weight:800;color:white;">⚡ FlowForge AI</span>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">Your weekly automation summary</p>
        </td></tr>
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0f172a;">Great week, ${userName}!</h1>
          <p style="margin:0 0 28px;color:#64748b;font-size:15px;">Here's what your workflows accomplished this week.</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr>
              <td width="33%" style="text-align:center;padding:20px;background:#f0fdf4;border-radius:12px;margin-right:8px;">
                <p style="margin:0;font-size:32px;font-weight:800;color:#16a34a;">${stats.totalRuns}</p>
                <p style="margin:4px 0 0;font-size:12px;color:#64748b;font-weight:600;">Total Runs</p>
              </td>
              <td width="4%"></td>
              <td width="33%" style="text-align:center;padding:20px;background:#eff6ff;border-radius:12px;">
                <p style="margin:0;font-size:32px;font-weight:800;color:#2563eb;">${stats.successRate}%</p>
                <p style="margin:4px 0 0;font-size:12px;color:#64748b;font-weight:600;">Success Rate</p>
              </td>
              <td width="4%"></td>
              <td width="26%" style="text-align:center;padding:20px;background:#faf5ff;border-radius:12px;">
                <p style="margin:0;font-size:13px;font-weight:700;color:#7c3aed;">${stats.topWorkflow}</p>
                <p style="margin:4px 0 0;font-size:12px;color:#64748b;font-weight:600;">Top Workflow</p>
              </td>
            </tr>
          </table>

          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:white;font-size:14px;font-weight:600;padding:12px 24px;border-radius:10px;text-decoration:none;">
            View Dashboard →
          </a>
        </td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid #f1f5f9;background:#f8fafc;">
          <p style="margin:0;font-size:12px;color:#94a3b8;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings" style="color:#6366f1;text-decoration:none;">Manage email preferences</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });
}
