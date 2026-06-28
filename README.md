<div align="center">

<img src="https://raw.githubusercontent.com/indhiran08-coder/Flowforge-ai/main/public/logo.png" alt="FlowForge AI Logo" width="80" height="80" onerror="this.style.display='none'"/>

# ⚡ FlowForge AI

**Visual AI-powered workflow automation — build, automate, and deploy intelligent pipelines with drag-and-drop simplicity.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)

<br/>

[🚀 Live Demo](https://flowforge-ai.vercel.app) · [📖 Docs](docs/) · [🐛 Report Bug](https://github.com/indhiran08-coder/Flowforge-ai/issues) · [✨ Request Feature](https://github.com/indhiran08-coder/Flowforge-ai/issues)

</div>

---

## 🎯 What is FlowForge AI?

FlowForge AI is a **self-hostable, open-source workflow automation platform** that lets you build complex automations visually — no code required for simple flows, full TypeScript for advanced ones.

Think **Zapier + n8n**, but with first-class AI integration baked in.

```
Manual Trigger → HTTP Request → AI Chat (GPT-4) → Send Email → Done ✅
```

Connect APIs, run AI prompts, send emails, make conditional decisions — all through a beautiful visual canvas.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🤖 AI-Native
- **AI Chat nodes** powered by OpenAI / GPT-4
- Natural language prompt building
- AI responses piped into any next step
- Template variable resolution `{{ ai.response }}`

</td>
<td width="50%">

### 🔗 Integrations
- **HTTP Request** — call any REST API (GET, POST, PUT, PATCH, DELETE)
- **Email** — automated emails via Resend
- **Webhooks** — receive external events and trigger flows
- **Code nodes** — write custom TypeScript logic inline

</td>
</tr>
<tr>
<td width="50%">

### ⚡ Execution Engine
- **Real-time SSE streaming** — watch logs as they happen
- **Topological execution** — smart node ordering
- **Retry logic** — built-in error handling
- **Execution history** — full audit trail of every run

</td>
<td width="50%">

### 🔐 Security & Auth
- **Clerk authentication** — enterprise-grade auth out of the box
- **Credentials vault** — encrypted storage for API keys & secrets
- **Per-user isolation** — full data separation
- **Stripe billing** — subscription plans built-in

</td>
</tr>
</table>

---

## 🧩 Node Types

| Category | Nodes |
|----------|-------|
| 🟣 **Triggers** | Manual Trigger, Webhook, Schedule |
| 🔵 **Actions** | HTTP Request, Send Email, AI Chat, Code, Output |
| 🟡 **Logic** | If/Else Condition, Filter, Loop, Delay, Set Variables |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | [Next.js 15](https://nextjs.org) (App Router) | Full-stack React framework |
| **Language** | TypeScript 5 | End-to-end type safety |
| **Database** | PostgreSQL + [Prisma ORM](https://prisma.io) | Data persistence |
| **Auth** | [Clerk](https://clerk.com) | Authentication & user management |
| **Payments** | [Stripe](https://stripe.com) | Subscription billing |
| **Canvas** | [React Flow (@xyflow)](https://reactflow.dev) | Visual workflow editor |
| **Styling** | Tailwind CSS + shadcn/ui | UI components |
| **Email** | [Resend](https://resend.com) | Email delivery |
| **Streaming** | Server-Sent Events (SSE) | Real-time execution logs |
| **Deploy** | [Vercel](https://vercel.com) / Docker | Hosting |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+
- **PostgreSQL** database (local or hosted — [Neon](https://neon.tech), [Supabase](https://supabase.com) work great)
- [Clerk](https://clerk.com) account — free tier is enough
- [Stripe](https://stripe.com) account — for billing (optional)
- [OpenAI](https://platform.openai.com) API key — for AI nodes (optional)
- [Resend](https://resend.com) API key — for email nodes (optional)

### Quick Install

```bash
# 1. Clone the repo
git clone https://github.com/indhiran08-coder/Flowforge-ai.git
cd Flowforge-ai

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your keys (see below)

# 4. Push database schema
npx prisma db push

# 5. Start the dev server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** — you're live! 🎉

### Docker (Self-Host)

```bash
# Start with Docker Compose (includes PostgreSQL)
docker-compose up -d
```

---

## 🔑 Environment Variables

Copy `.env.example` → `.env.local` and fill in:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/flowforge"

# Auth (Clerk — clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Payments (Stripe — optional)
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI (OpenAI — optional, for AI Chat nodes)
OPENAI_API_KEY=sk-...

# Email (Resend — optional, for Send Email nodes)
RESEND_API_KEY=re_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> See [`.env.example`](.env.example) for the full list with descriptions.

---

## 📁 Project Structure

```
flowforge-ai/
├── app/
│   ├── (dashboard)/          # Authenticated dashboard pages
│   │   ├── dashboard/
│   │   │   ├── workflows/    # Workflow list & editor
│   │   │   ├── executions/   # Execution history
│   │   │   └── settings/     # Credentials & profile
│   ├── (marketing)/          # Public landing & pricing pages
│   └── api/                  # API route handlers
│       ├── workflows/        # CRUD + execute endpoints
│       ├── executions/       # Execution streaming (SSE)
│       └── webhooks/         # External webhook triggers
├── components/
│   ├── workflow/             # Canvas, node forms, node browser
│   └── ui/                   # shadcn/ui + custom components
├── lib/
│   └── execution/            # Workflow execution engine
│       └── executors/        # Per-node-type executors
├── features/                 # Server actions & business logic
├── hooks/                    # Custom React hooks (15+)
├── types/                    # Shared TypeScript types
├── lib/utils/                # Utility functions (20+)
├── lib/constants/            # App-wide constants
├── docs/                     # Documentation
└── prisma/                   # Database schema & migrations
```

---

## 🔄 How It Works

```
1. Build  →  Drag nodes onto canvas, connect them, configure each step
2. Trigger →  Run manually, via webhook, or on a schedule  
3. Execute →  Engine resolves execution order, runs each node sequentially
4. Stream  →  Watch real-time logs via SSE as your workflow runs
5. Review  →  Full execution history with per-step logs & outputs
```

### Example: AI-Powered Email Report

```
Schedule (daily 9am)
  └─► HTTP Request (fetch weather API)
        └─► AI Chat (summarize + write email body using GPT-4)
              └─► Send Email (deliver to your inbox)
```

### Example: Webhook Form Handler

```
Webhook Trigger (receives form data)
  └─► Set Variables (extract name, email, message)
        └─► If/Else (check if premium user)
              ├─► [yes] HTTP Request (notify Slack)
              └─► [no]  Send Email (auto-reply)
```

---

## 📊 Execution Engine

The engine uses **topological sorting** to resolve node execution order, then runs each executor:

```typescript
// Every node has an executor
executors = {
  'http-request':    HttpRequestExecutor,
  'ai-chat':         AiChatExecutor,
  'send-email':      SendEmailExecutor,
  'if-condition':    IfConditionExecutor,
  'code':            CodeExecutor,
  // ...12 total
}
```

Results stream back via **Server-Sent Events** in real time — no polling required.

---

## 🤝 Contributing

Contributions are what make open source amazing. Any contribution you make is **greatly appreciated**!

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 🗺️ Roadmap

- [ ] **Slack / Discord integration nodes**
- [ ] **Google Sheets read/write node**
- [ ] **Parallel branch execution**
- [ ] **Sub-workflow (workflow-in-workflow) node**
- [ ] **Team workspaces & RBAC**
- [ ] **Natural language workflow builder** ("Create a workflow that...")
- [ ] **Marketplace** — share & remix community workflows

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org) — The React Framework for the Web
- [React Flow](https://reactflow.dev) — Highly customizable React library for workflow/node-based UIs
- [shadcn/ui](https://ui.shadcn.com) — Beautifully designed components
- [Clerk](https://clerk.com) — The most comprehensive User Management Platform
- [Prisma](https://prisma.io) — Next-generation Node.js and TypeScript ORM

---

<div align="center">

**If FlowForge AI saved you time or inspired you, please consider giving it a ⭐**

Made with ❤️ by [indhiran08-coder](https://github.com/indhiran08-coder)

</div>
