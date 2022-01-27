FROM node:16

LABEL name 'bud'
LABEL version 1

RUN npm install netlify-cli npm-cli-login typedoc --global

COPY ./.docker/bud/motd /etc/motd
COPY ./.docker/bud/bash.bashrc /etc/bash.bashrc

COPY ./ /srv/bud
