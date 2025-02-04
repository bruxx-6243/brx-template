# Base image with Node and pnpm
FROM node:20.12.2-alpine3.18 AS base
WORKDIR /app
RUN npm i -g pnpm

# Install dependencies
FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build the application
FROM dependencies AS builder
COPY . .
RUN pnpm build

# Production image
FROM node:20.12.2-alpine3.18 AS runner
WORKDIR /app

# Copy built files and node_modules from the builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY .env.example .env

EXPOSE 8080
CMD ["pnpm", "run", "dev"]
