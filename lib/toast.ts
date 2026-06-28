// Lightweight toast using browser native notifications as fallback
// Replace with sonner or react-hot-toast when needed
export const toast = {
  success: (msg: string) => {
    if (typeof window !== "undefined") {
      console.log("[toast:success]", msg);
      // Simple DOM toast
      showToast(msg, "success");
    }
  },
  error: (msg: string) => {
    if (typeof window !== "undefined") {
      console.error("[toast:error]", msg);
      showToast(msg, "error");
    }
  },
};

function showToast(message: string, type: "success" | "error") {
  const el = document.createElement("div");
  el.textContent = message;
  el.style.cssText = `
    position:fixed;bottom:24px;right:24px;z-index:9999;
    padding:12px 20px;border-radius:10px;font-size:14px;font-weight:500;
    color:white;box-shadow:0 4px 20px rgba(0,0,0,0.15);
    background:${type === "success" ? "#10b981" : "#ef4444"};
    animation:slideIn .2s ease;
  `;
  document.head.insertAdjacentHTML(
    "beforeend",
    `<style>@keyframes slideIn{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}</style>`
  );
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}
