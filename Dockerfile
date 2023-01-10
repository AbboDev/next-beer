FROM node:16-alpine

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# create destination directory
RUN mkdir -p /frontend
WORKDIR /frontend

# install pnpm
RUN npm install -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY components ./components
COPY pages ./pages
COPY public ./public
COPY styles ./styles

COPY .eslintrc.json ./
COPY next-env.d.ts ./
COPY next.config.js ./
COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

EXPOSE $PORT

CMD pnpm dev
