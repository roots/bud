FROM node:16

LABEL name 'bud'
LABEL version 1

RUN npm install netlify-cli npm-cli-login --global

COPY ./dev/docker/bud/motd /etc/motd
COPY ./dev/docker/bud/bash.bashrc /etc/bash.bashrc

COPY ./ /srv/bud

RUN mkdir -p /srv/bud/node_modules \
  && mkdir -p /srv/bud/storage/verdaccio \
  && mkdir -p /srv/bud/storage/yarn \
  && mkdir -p /srv/bud/storage/coverage \
  && mkdir -p /srv/mocks
