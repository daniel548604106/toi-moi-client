## Multistage build
FROM node:17-alpine as base
# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json .
ENV NODE_ENV production
RUN npm ci

# Stage 2: Build project
FROM base AS builder
WORKDIR /app
COPY . .
RUN npm run build

CMD ["npm", "run", "start"]