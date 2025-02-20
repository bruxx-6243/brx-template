# Stage 1: Base image with pnpm installed
FROM node:20.12.2-alpine3.18 AS base

# Install pnpm globally
RUN npm install -g pnpm

# Stage 2: Builder stage
FROM base AS deps

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

FROM base AS builder

WORKDIR /app

# Copy the rest of the application code
COPY . .

# Copy modules and dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Build the application
RUN pnpm run build

# Stage 3: Runner stage
FROM base AS runner

# Set working directory
WORKDIR /app

# Copy artifacts from the previous stages
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose port 8080
EXPOSE 8080
ENV VITE_PORT=8080

# Start the application
CMD ["pnpm", "preview"]