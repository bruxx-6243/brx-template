# BRX TEMPLATE - Getting Started Guide 🚀

## Overview

`BRX TEMPLATE` is a production-ready boilerplate for modern React projects. It eliminates the tedious setup process, letting you jump straight into coding with a preconfigured, optimized environment. Built with best practices, it’s designed for scalability, maintainability, and rapid deployment.

### Why BRX TEMPLATE?

- **Zero Setup Hassle**: Preconfigured tools save hours of initial setup.
- **Modern Stack**: Leverages Vite, React, TypeScript, and more for a cutting-edge dev experience.
- **Production-Ready**: Includes Docker, CI/CD, linting, and testing out of the box.
- **Focus on Code**: Spend time building features, not configuring tools.

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js**: Version 18+ (check with `node -v`; `.nvmrc` specifies the exact version).
- **npm**: Version 8+ (comes with Node.js; verify with `npm -v`).
- **Docker**: Optional, for containerized deployment (install from [docker.com](https://www.docker.com/)).
- **Git**: For cloning and version control.

---

## Installation

### Step 1: Install the BRX CLI

The BRX CLI simplifies project creation. Install it globally:

```bash
npm install -g @bruxx/cli
```

### Step 2: Create Your Project

Run the CLI to scaffold your project:

```bash
npx create-brx-app
```

Follow the prompts to name your project (e.g., my-app).  
The CLI sets up the directory, installs dependencies, and initializes Git.

### Step 3: Navigate to Your Project

```bash
cd my-app
```

### Step 4: Configure Environment

Copy `.env.example` to `.env` and adjust variables as needed:

```bash
cp .env.example .env
```

#### Example `.env`:

```env
VITE_PORT=8080
VITE_BACKEND_API_BASE_URL=https://api.example.com
```

- `VITE_BACKEND_API_BASE_URL`: Set to your API’s base URL (e.g., `https://jsonplaceholder.typicode.com` for testing).
- No need to set `NODE_ENV`; it’s managed automatically (`"test"` for tests, `"development"/"production"` otherwise).

## Project Structure

Here’s a quick overview of key directories and files:

```text
my-app/
├── .github/              # GitHub Actions for CI/CD
├── .husky/               # Git hooks (e.g., linting on commit)
├── src/                  # Source code
│   ├── __tests__/        # Unit tests
│   ├── assets/           # Static assets (images, fonts)
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utilities and API logic
│   │   ├── api/          # API controllers and services
│   ├── routes/           # TanStack Router routes
│   ├── store/            # Zustand state management
│   ├── types/            # TypeScript types
│   ├── app.tsx           # Root component
│   ├── env.ts            # Environment variable validation
│   ├── main.tsx          # Entry point
│   ├── router.tsx        # Router setup
├── .env                  # Environment variables
├── Dockerfile            # Docker configuration
├── package.json          # Scripts and dependencies
├── vite.config.ts        # Vite configuration
```

## Running the Project

### Development

Start the dev server:

```bash
npm run dev
```

- Opens at `http://localhost:8080` (or your `VITE_PORT`).
- Hot Module Replacement (HMR) enabled via Vite.

### Build

Compile for production:

```bash
npm run build
```

- Output goes to `./dist`.

### Preview

Test the production build locally:

```bash
npm run preview
```

### Test

Run unit tests with Vitest:

```bash
npm run test
```

- Sets `NODE_ENV="test"` automatically, using an empty `baseUrl` for API mocks.

---

## Core Features

### API Integration

BRX TEMPLATE provides two API controllers for seamless HTTP requests:

- `ControllerWithAuth`: For authenticated endpoints (requires a token).
- `ControllerWithoutAuth`: For public endpoints (no token needed).

#### Example: Fetching Posts

**Authenticated Request** (e.g., user-specific posts):

```typescript
// src/lib/api/controllers/post-controller.ts
import ControllerWithAuth from "@/lib/api/controllers/main/controller-with-auth";
import type { Post } from "@/types";

export default class PostController extends ControllerWithAuth {
  async getUserPosts(userId: number): Promise<Post[]> {
    return this.get(`/users/${userId}/posts`);
  }
}

export const { getUserPosts } = new PostController();

// Usage in a component
import { createQueryMethod } from "@/lib/api/query-methods";

const { data: posts } = createQueryMethod({
  key: ["user-posts", userId],
  fn: async () => {
    return await getUserPosts({ userId });
  },
}).useHook();
```

**Unauthenticated Request** (e.g., public posts):

```typescript
import ControllerWithoutAuth from "@/lib/api/controllers/main/controller-without-auth";
import type { Posts } from "@/types";

export default class PostController extends ControllerWithoutAuth {
  constructor() {
    super();
  }

  async getAllPosts({ limit }: { limit?: number }) {
    try {
      const query = new URLSearchParams();

      if (limit) {
        query.append("_limit", String(limit));
      }

      return await this.apiService.get<Posts>(`/posts?${query}`);
    } catch (error) {
      this.handleError(error);
    }
  }
}

export const { getAllPosts } = new PostController();

// Usage in a component
const { data, isLoading, error } = createQueryMethod({
  key: ["posts", limit],
  fn: async () => {
    return await getAllPosts({ limit });
  },
}).useHook();
```

---

## Deployment

### Docker

Build and run with Docker:

```bash
docker build -t my-app .
docker run -p 8080:8080 my-app
```

### CI/CD

GitHub Actions workflows in `.github/workflows/` handle linting, testing, and deployment.  
Configure secrets in your GitHub repo (e.g., `DOCKERHUB_TOKEN`).

## Contributing

- **Issues**: Report bugs or suggest features on GitHub.
- **Pull Requests**: Fork, modify, and submit a PR with clear descriptions.

## Next Steps

- Explore `src/lib/api/` for API logic.
- Add routes in `src/routes/`.
- Customize `src/store/` for state needs.
- Write tests in `src/__tests__/`.

Happy coding with BRX TEMPLATE! 🚀
