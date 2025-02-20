# BRX TEMPLATE - Boilerplate for Modern Development 🚀

## Introduction

`BRX TEMPLATE` is a boilerplate designed to accelerate the setup of a modern React project. The idea for this template came from the fact that there wasn’t an existing boilerplate that included a fully configured and optimized environment for fast and efficient development.

Every time I started a new project, I would spend hours, sometimes even days, just setting up the environment before writing a single line of code. Additionally, deploying with Docker and setting up CI/CD took a considerable amount of time.

That’s why I decided to create **BRX TEMPLATE**, a ready-to-use solution with best practices already integrated, allowing you to focus on what really matters: **developing your application**.

## 🚀 Why Choose BRX TEMPLATE?

- **Save time**: No more repetitive setup for every project.
- **Modern and efficient**: Uses the best tools for a smooth development experience.
- **Cloud-ready**: Built-in Docker configuration for simplified deployment.
- **Quality and maintainability**: Linting, formatting, and commit conventions ensure clean code.
- **Scalability**: Designed for modern and scalable applications.

## 📦 Tools and Technologies

BRX TEMPLATE uses a combination of the best tools for modern and scalable development:

### Development

- **Vite**: Fast and modern build tool.
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Adds static types to JavaScript.
- **Zod**: TypeScript schema validation.
- **Zustand**: Lightweight and simple state management.
- **TanStack Router**: Modern and type-safe routing.
- **TanStack Query**: Client-side data management.

### Testing

- **Vitest**: Testing framework for unit and component tests.

### Styling

- **TailwindCSS**: Utility-first CSS framework.
- **PostCSS**: CSS transformation with JavaScript.

### Code Quality

- **ESLint**: Linting for JavaScript/TypeScript.
- **Prettier**: Code formatting.

### Deployment

- **Docker**: Application containerization.
- **GitHub Actions**: Continuous Integration and Continuous Deployment (CI/CD).

### Other

- **Commitlint**: Commit message validation.
- **Husky**: Git hooks to automate tasks.
- **T3-env**: Environment variable management.

### Installation

First, install the BRUXX CLI package globally using npm:

```bash
npm install -g @bruxx/cli
```

Once the CLI is installed, create your new project by running:

```bash
npx create-brx-app
```

## 📂 Project Structure

The following is the folder structure of the BRX TEMPLATE boilerplate:

```
project-name/
│── .github/              # GitHub configuration (Workflows, Actions)
│── .husky/               # Git hooks (Commitlint, Pre-push checks)
│── coverage/             # Code coverage reports
│── dist/                 # Build output directory
│── node_modules/         # Dependencies
│── public/               # Static assets (favicon, images, etc.)
│── src/                  # Application source code
│   ├── __tests__/        # Unit and component tests
│   ├── assets/           # Static assets like images, fonts
│   ├── components/       # Reusable UI components
│   ├── lib/              # Library functions and helpers
│   ├── routes/           # Application routes
│   ├── store/            # Zustand store
│   ├── types/            # TypeScript types
│   ├── app.tsx          # Main application component
│   ├── env.ts           # Environment configuration
│   ├── index.css        # Global styles
│   ├── main.tsx         # Entry point
│   ├── providers.tsx    # Context providers
│   ├── router.tsx       # Router configuration
│   ├── routeTree.gen.ts # Generated route tree
│   ├── vite-env.d.ts    # Vite environment types
│── .env                 # Environment variables
│── .env.example         # Example environment variables
│── .gitignore           # Git ignored files
│── .lintstagedrc.json   # Lint-staged configuration
│── .nvmrc               # Node version configuration
│── .prettierrc          # Prettier configuration
│── commitlint.config.cjs # Commitlint configuration
│── docker-compose.yml   # Docker Compose configuration
│── Dockerfile           # Docker configuration
│── eslint.config.js     # ESLint configuration
│── index.html           # Main HTML file
│── package.json         # Dependencies and scripts
│── postcss.config.ts    # PostCSS configuration
```

## 📄 Creating a Page

To create a page, navigate to the `/src/routes/_authenticated` folder and create a new directory for your route. Inside that directory, create an `index.tsx` file. By default, TanStack will generate a page for you, which you can modify as needed. For example:

```tsx
import AppLayout from "@/components/layouts/app-layout";
import PageComponent from "@/components/pages/posts/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/posts/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout>
      <PageComponent />
    </AppLayout>
  );
}
```

## 🌐 Making an API Call

Making API calls is very simple thanks to BRX's configuration. Just go to the `src/lib/api/controller/` folder and create a controller to manage different API calls. Here's an example:

```ts
import BaseController from "@/lib/api/handlers/base-controller";
import type { Posts } from "@/types";

export default class PostController extends BaseController {
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
```

All methods in the PostController can be used throughout your application.

To retrieve data returned by the getAllPosts function, you can use TanStack's methods like `createQueryMethod` and `createMutationMethod` to easily handle query and mutation calls. For example:

```ts
const { data, isLoading, error } = createQueryMethod({
  key: ["posts", limit],
  fn: async () => {
    return await getAllPosts({ limit });
  },
}).useHook();
```

For performing mutations, you can use a similar approach:

```ts
const createUserMutation = createMutationMethod({
  key: "create-user",
  schema: userSchema,
  fn: async (variables: { id: number; name: string }) => {
    await new Promise((r) => setTimeout(r, 2000));

    return { id: variables.id, name: variables.name };
  },
  options: {
    onSuccess: ({ name }) => {
      toast.success(`The user ${name} was created`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  },
}).useHook();
```

## 🔐 Authentication

If your application has authentication, make sure to add your authentication logic and store the token for use in future requests. To protect your app, add the token verification logic inside the `/src/routes/_authenticated` folder, which will act as middleware and mount for every request you make.

## 🤝 Contributing

We welcome contributions! If you’d like to contribute to `BRX TEMPLATE`, please submit a pull request or open an issue.
