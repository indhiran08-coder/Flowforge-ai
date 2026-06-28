# 🔥 FlowForge AI

> **Visual workflow automation powered by AI** — Build, automate, and deploy intelligent workflows with a drag-and-drop interface.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- 🧠 **AI-Powered Nodes** — Integrate OpenAI/Gemini directly into your workflows
- 🔗 **HTTP Request Nodes** — Call any external API with full control over headers, body, and auth
- 📧 **Email Automation** — Send automated emails as part of any workflow
- 🔀 **Conditional Logic** — If/else branching, filters, and loops
- ⏱️ **Scheduling & Delays** — Time-based triggers and delay nodes
- 🪝 **Webhooks** — Trigger workflows from external events
- 🔐 **Credentials Vault** — Securely store and reuse API keys and secrets
- 📊 **Execution Tracking** — Real-time streaming logs for every run
- 💳 **Stripe Integration** — Built-in subscription and plan management

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL + Prisma ORM |
| Auth | Clerk |
| Payments | Stripe |
| Workflow Canvas | React Flow |
| Styling | Tailwind CSS |
| Email | Resend |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Clerk account (for auth)
- Stripe account (for payments)

### Installation

```bash
# Clone the repository
git clone https://github.com/indhiran08-coder/Flowforge-ai.git
cd Flowforge-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your keys in .env.local

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables

See [`.env.example`](.env.example) for all required environment variables.

Key variables:
- `DATABASE_URL` — PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — Clerk public key
- `CLERK_SECRET_KEY` — Clerk secret key
- `STRIPE_SECRET_KEY` — Stripe secret key
- `OPENAI_API_KEY` — OpenAI API key (for AI nodes)
- `RESEND_API_KEY` — Resend API key (for email nodes)

---

## 📁 Project Structure

```
flowforge-ai/
├── app/                    # Next.js App Router pages & API routes
│   ├── (dashboard)/        # Authenticated dashboard pages
│   ├── (marketing)/        # Public marketing pages
│   └── api/                # API route handlers
├── components/             # Reusable UI components
│   └── workflow/           # Workflow canvas & node components
├── features/               # Server actions & business logic
├── lib/
│   └── execution/          # Workflow execution engine
│       └── executors/      # Individual node executors
└── prisma/                 # Database schema & migrations
```

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## 📄 License

MIT © [indhiran08-coder](https://github.com/indhiran08-coder)
