FROM node:20.12.2-alpine3.18 AS base

# Install pnpm globally
RUN npm i -g pnpm

# Phase 1: Builder
FROM base AS builder
RUN apk update && apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy only package.json and pnpm-lock.yaml to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm build

# Phase 2: Runner
FROM base AS runner

# Copy installed dependencies and built files from builder stage
COPY --from=builder /app /app

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["pnpm", "run", "dev"]