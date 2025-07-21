# Use the official Bun image as base
# Base stage for dependencies
FROM oven/bun:1 AS base

WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Development stage - optimized for volume mounting
FROM oven/bun:1 AS development

WORKDIR /app

# Copy dependencies from base
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/bun.lock* ./

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Set environment
ENV NODE_ENV=development
ENV PORT=3000

# Create necessary directories and set permissions
RUN mkdir -p .next public && \
    chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

EXPOSE 3000

CMD ["bun", "run", "dev"]


# Production stage
FROM oven/bun:1 AS production

WORKDIR /app

# Copy dependencies from base
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/bun.lock* ./

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Create necessary directories and set permissions
RUN mkdir -p .next public && \
    chown -R nextjs:nodejs /app

# COPY
COPY src /app/src
COPY public /app/public
COPY tsconfig.json next.config.ts *.mjs /app/

# Build to production
RUN bun run build

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Switch to non-root user
USER nextjs

EXPOSE 3000

CMD ["bun", "run", "start"]