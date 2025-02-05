FROM node:20.12.2-alpine3.18 AS base

# Install pnpm globally
RUN npm i -g pnpm

# Phase 1
FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
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
# Start the application
CMD ["pnpm", "run", "dev", "--", "--host"]