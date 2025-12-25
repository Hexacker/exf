FROM node:22.16.0-alpine3.22 AS base

# All deps stage
FROM base AS deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci

# Build stage
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build
WORKDIR /app/build
RUN npm ci --omit=dev

# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/build /app
EXPOSE 3333
CMD ["node", "./bin/server.js"]
