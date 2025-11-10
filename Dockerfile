FROM node:20-alpine AS builder
WORKDIR /app
ENV NODE_ENV=development

# Install backend dependencies
COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm ci

# Install frontend dependencies
COPY frontend/package.json frontend/package-lock.json ./frontend/
RUN cd frontend && npm ci

# Copy source
COPY backend ./backend
COPY frontend ./frontend

# Build backend (TypeScript -> dist)
RUN cd backend && npm run build

# Build frontend (Vite -> dist)
RUN cd frontend && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies for backend
COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm ci --omit=dev

# Copy compiled backend
COPY --from=builder /app/backend/dist ./backend/dist

# Copy built frontend into backend served path
COPY --from=builder /app/frontend/dist ./backend/dist/build

# Default port (overridable via env)
ENV PORT=3000
EXPOSE 3000

# Healthcheck against backend health endpoint
# Install wget for healthcheck (lightweight in alpine)
RUN apk add --no-cache wget
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

WORKDIR /app/backend
CMD ["node", "dist/index.js"]
