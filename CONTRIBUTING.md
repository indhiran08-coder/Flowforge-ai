# 🤝 Contributing to FlowForge AI

Thank you for your interest in contributing! We welcome contributions of all kinds — bug fixes, new features, documentation improvements, and more.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Convention](#commit-message-convention)
- [Pull Request Process](#pull-request-process)
- [Adding a New Node Type](#adding-a-new-node-type)

---

## 📜 Code of Conduct

Please be respectful and constructive in all interactions. We follow the [Contributor Covenant](https://www.contributor-covenant.org/).

---

## 🛠️ How to Contribute

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create a branch** from `main` (see naming conventions below)
4. **Make your changes** with clear, focused commits
5. **Push** your branch and open a **Pull Request**
6. Wait for review and address any feedback

---

## 💻 Development Setup

```bash
# 1. Clone your fork
git clone https://github.com/<your-username>/Flowforge-ai.git
cd Flowforge-ai

# 2. Install dependencies
npm install

# 3. Copy and fill in environment variables
cp .env.example .env.local

# 4. Push the database schema
npx prisma db push

# 5. Start the dev server
npm run dev
```

---

## 🌿 Branch Naming Convention

Use the following prefixes:

| Prefix | Use case |
|--------|----------|
| `feat/` | New features |
| `fix/` | Bug fixes |
| `docs/` | Documentation changes |
| `refactor/` | Code refactoring |
| `chore/` | Tooling, config, dependencies |
| `test/` | Tests |

**Example:** `feat/add-slack-node`, `fix/execution-stream-timeout`

---

## 💬 Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(optional scope): <short description>

[optional body]
```

**Examples:**
```
feat(executor): add Slack notification node
fix(engine): handle empty workflow edge case
docs: update README setup instructions
```

---

## 🔀 Pull Request Process

1. Ensure your branch is up to date with `main`
2. Fill in the PR template (title, description, what was changed)
3. Link any related issues with `Closes #<issue-number>`
4. Request a review
5. Address all review comments before merging

---

## ➕ Adding a New Node Type

FlowForge AI is built to be extended. To add a new node type:

1. **Create the executor** in `lib/execution/executors/<node-type>.ts`
   - Implement the `NodeExecutor` interface from `lib/execution/types.ts`

2. **Register it** in `lib/execution/executors/index.ts`

3. **Create the node form** in `components/workflow/node-forms/<node-type>-form.tsx`

4. **Register the node** in `components/workflow/node-types.tsx`

5. **Add the node** to the node browser in `components/workflow/node-browser.tsx`

---

## ❓ Questions?

Open a [GitHub Discussion](https://github.com/indhiran08-coder/Flowforge-ai/discussions) or create an [Issue](https://github.com/indhiran08-coder/Flowforge-ai/issues).
