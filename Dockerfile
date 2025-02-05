FROM node:20.12.2-alpine3.18 AS base

# Install pnpm globally
RUN npm i -g pnpm

# Phase 1
FROM base AS builder
RUN apk update && apk add --no-cache curl

# Set working directory
WORKDIR /app
COPY . .
# Add lockfile and package.json's of isolated subworkspace
FROM builder AS installer

RUN pnpm install

FROM installer AS runner

RUN pnpm build

EXPOSE 8080
CMD ["pnpm", "run", "dev"]