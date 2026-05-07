# syntax=docker/dockerfile:1.7
# ─────────────────────────────────────────────────────────────────────────────
# KYA Mission Control — Cloud Run image
#
# Three stages:
#   deps  : install only production deps from a clean lockfile
#   build : full deps + next build (emits .next/standalone)
#   run   : tiny runtime image, copies only the standalone output
#
# Final image is ~150 MB; cold start on Cloud Run is sub-second.
# ─────────────────────────────────────────────────────────────────────────────

# ─── deps ────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# ─── build ───────────────────────────────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ─── run ─────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Cloud Run sets PORT — Next standalone server reads it.
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as non-root for hardened cold starts and policy compliance.
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Standalone bundle = next-server + only the deps it actually loads.
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

# Standalone bundle's entrypoint.
CMD ["node", "server.js"]
