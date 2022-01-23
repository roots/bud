FROM node:16

LABEL name 'bud'
LABEL version 1

ENV DOCKER_BUILDKIT=1

RUN npm install netlify-cli npm-cli-login --global

COPY ./dev/docker/bud/motd /etc/motd
COPY ./dev/docker/bud/bash.bashrc /etc/bash.bashrc

COPY ./ /bud
