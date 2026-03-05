# Hyo Arbitragem

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Silush/hyo-arbitragem-prototype)

A production-ready full-stack application built on Cloudflare Workers with Durable Objects for scalable, stateful backend storage. Features a modern React frontend with shadcn/ui components, Tailwind CSS, and TanStack Query for data fetching. Demonstrates real-time chat functionality with users, chats, and messages using indexed entities.

## ✨ Key Features

- **Serverless Backend**: Cloudflare Workers with Hono routing and Durable Objects for persistent storage (users, chats, messages).
- **Indexed Entities**: Efficient listing, creation, and deletion of users and chat boards with automatic indexing.
- **Modern UI**: Responsive design with shadcn/ui components, Tailwind CSS, dark mode, sidebar layout, and smooth animations.
- **Data Management**: TanStack Query for optimistic updates, caching, and pagination.
- **Type-Safe**: Full TypeScript support across frontend and backend with shared types.
- **Production-Ready**: CORS, error handling, logging, health checks, and client error reporting.
- **Mock Data Seeding**: Automatic population of sample users and chats on first access.
- **Mobile-Responsive**: Hooks for mobile detection and adaptive layouts.

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, React Router, Lucide Icons, Sonner (toasts), Framer Motion.
- **Backend**: Cloudflare Workers, Hono, Durable Objects (GlobalDurableObject with entities and indexes).
- **State & Data**: Immer, Zustand (if extended), shared types via `@shared/*`.
- **Dev Tools**: Bun, ESLint, Wrangler CLI.
- **UI/UX**: Dark/Light theme toggle, sidebar, glassmorphism effects, gradients.

## 🚀 Quick Start

1. **Clone & Install**:
   ```bash
   git clone <your-repo-url>
   cd hyo-arbitragem-5ifbt9ymlncenhyfi7iaf
   bun install
   ```

2. **Development**:
   ```bash
   bun run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or `$PORT`).

3. **Build & Preview**:
   ```bash
   bun run build
   bun run preview
   ```

## 📋 Installation & Setup

This project uses **Bun** as the package manager and runtime.

1. Ensure Bun is installed: [bun.sh](https://bun.sh)
2. Install dependencies:
   ```bash
   bun install
   ```
3. Generate Cloudflare types (optional, for IDE support):
   ```bash
   bun run cf-typegen
   ```
4. Configure environment (if needed):
   - Copy `.env.example` to `.env` and fill in values.
   - Update `wrangler.jsonc` for custom bindings/migrations.

## 💻 Development Workflow

- **Frontend**: Edit `src/` files. Hot reload via Vite.
- **Backend Routes**: Add endpoints in `worker/user-routes.ts`. Core utils in `worker/core-utils.ts` and entities in `worker/entities.ts`.
- **Shared Types**: Define in `shared/types.ts` and `shared/mock-data.ts` for cross-compatibility.
- **Linting**: `bun run lint`
- **Custom Entities**: Extend `IndexedEntity` or `Entity` in `worker/entities.ts`.
- **UI Components**: Use shadcn/ui via `components.json`. Add new ones with `bunx shadcn-ui@latest add <component>`.

### API Endpoints

Base: `/api/`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/users` | List users (?cursor=&limit=) |
| POST | `/api/users` | Create user |
| DELETE | `/api/users/:id` | Delete user |
| POST | `/api/users/deleteMany` | Bulk delete users |
| GET | `/api/chats` | List chats |
| POST | `/api/chats` | Create chat |
| GET | `/api/chats/:chatId/messages` | Get messages |
| POST | `/api/chats/:chatId/messages` | Send message |
| DELETE | `/api/chats/:id` | Delete chat |

All responses follow `{ success: boolean; data?: T; error?: string }`.

## 🔧 Customization

- **Theme/UI**: Edit `tailwind.config.js`, `src/index.css`.
- **Pages**: Replace `src/pages/HomePage.tsx`.
- **Layout**: Use `AppLayout` for sidebar or plain components.
- **Queries**: Extend `api` client in `src/lib/api-client.ts`.
- **Error Reporting**: Client errors auto-report to `/api/client-errors`.

## 🚀 Deployment

Deploy to Cloudflare Workers with zero-config:

1. Install Wrangler: `bun add -g wrangler`
2. Login: `wrangler login`
3. Deploy:
   ```bash
   bun run deploy
   ```
   Or use the dashboard.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Silush/hyo-arbitragem-prototype)

**Custom Domain**: Update `wrangler.jsonc` and `wrangler deploy --var ASSETS_URL:...`.

## 🤝 Contributing

1. Fork & clone.
2. `bun install`
3. Make changes, lint, test locally.
4. PR with clear description.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

## 🙌 Support

- Issues: [GitHub Issues](https://github.com/.../issues)
- Discussions: [GitHub Discussions](https://github.com/.../discussions)
- Cloudflare Docs: [Workers](https://developers.cloudflare.com/workers), [Durable Objects](https://developers.cloudflare.com/durable-objects)

Built with ❤️ for Cloudflare Workers.