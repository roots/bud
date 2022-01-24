FROM node:16

LABEL name 'bud'
LABEL version 1

RUN npm install netlify-cli npm-cli-login --global

COPY ./dev/docker/bud/motd /etc/motd
COPY ./dev/docker/bud/bash.bashrc /etc/bash.bashrc

COPY ./ /bud

RUN mkdir -p /bud/node_modules \
  && mkdir -p /bud/storage/verdaccio \
  && mkdir -p /bud/storage/yarn \
  && mkdir -p /bud/storage/coverage \
  && mkdir -p /bud/storage/mocks
