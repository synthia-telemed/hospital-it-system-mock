FROM node:16-alpine as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:16-alpine 
RUN apk add --update libc6-compat openssl openssl-dev
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile --production
COPY prisma/schema.prisma ./prisma/schema.prisma
RUN yarn prisma-generate
COPY --from=builder /app/dist ./dist
CMD ["yarn", "start:prod"]
