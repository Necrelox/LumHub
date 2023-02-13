FROM node:19.6-alpine as builder
RUN apk update
COPY ./package.json ./
RUN npm install

FROM node:19.6-alpine
COPY . .
COPY --from=builder node_modules ./node_modules
RUN npm run build
RUN apk add --no-cache curl
HEALTHCHECK --interval=5s --timeout=3s --start-period=10s --retries=10 CMD curl -f http://account:5000/status/health || exit 1
CMD . ./entrypoint.sh
