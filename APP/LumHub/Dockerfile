FROM node:19.7-alpine as builder
WORKDIR /build
RUN apk update --no-cache && npm install -g pnpm
COPY . .
RUN pnpm install
RUN pnpm run postinstall
RUN pnpm run build

FROM node:19.7-alpine
WORKDIR /app
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/.output ./dist
COPY --from=builder /build/package.json ./package.json
COPY --from=builder /build/entrypoint.sh entrypoint.sh
RUN apk add --no-cache curl
#HEALTHCHECK --interval=5s --timeout=3s --start-period=10s --retries=10 CMD curl -f http://lumhub:3001/ || exit 1
CMD . ./entrypoint.sh
