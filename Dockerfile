FROM alpine:3.6
MAINTAINER Brian Ustas <brianustas@gmail.com>

ARG APP_PATH="/opt/knightly_partners_dashboard"

RUN apk add --update \
  nodejs \
  nodejs-npm \
  && rm -rf /var/cache/apk/*

WORKDIR $APP_PATH

COPY package.json $APP_PATH
COPY package-lock.json $APP_PATH
RUN npm install && npm install -g webpack@1.15.0

COPY . $APP_PATH

# Build public/ assets.
RUN npm run prod

VOLUME $APP_PATH
