FROM node:19.7-alpine as builder
WORKDIR /build
RUN apk update --no-cache && npm install -g pnpm
COPY package.json .
RUN pnpm install
COPY . .
RUN pnpm run build

FROM node:19.7-alpine
WORKDIR /app
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/package.json ./package.json
COPY --from=builder /build/entrypoint.sh ./entrypoint.sh
COPY --from=builder /build/databaseInit ./databaseInit
RUN apk add --no-cache curl
HEALTHCHECK --interval=5s --timeout=3s --start-period=10s --retries=10 CMD curl -f http://account:5000/status/health || exit 1
CMD . ./entrypoint.sh
