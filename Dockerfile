# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install all dependencies (including dev dependencies for build)
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the Next.js application
RUN yarn build

# Stage 2: Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Copy package files
COPY --from=builder /app/package.json /app/yarn.lock ./

# Install only production dependencies
RUN yarn install --production --frozen-lockfile && yarn cache clean

# Copy built application from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/app ./app
COPY --from=builder /app/messages ./messages
COPY --from=builder /app/i18n ./i18n
COPY --from=builder /app/middleware.ts ./middleware.ts

# Expose the port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["yarn", "start"]