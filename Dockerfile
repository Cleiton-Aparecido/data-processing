# Dockerfile

FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

FROM node:20-alpine AS app

WORKDIR /app

COPY --from=builder /app /app

RUN yarn install --production

CMD ["node", "dist/main"]
