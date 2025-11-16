# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy built application from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["node", "build"]
