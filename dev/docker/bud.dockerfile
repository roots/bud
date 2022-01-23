FROM node:16

LABEL name 'bud'
LABEL version 1

ENV DOCKER_BUILDKIT=1

RUN apt-get update \
    && apt-get install -y \
       curl less wget gnupg ca-certificates exa jq tldr nano vim ncdu \
    && apt-get clean apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

RUN npm install emma-cli netlify-cli npm-cli-login --global

COPY ./dev/docker/bud/motd /etc/motd
COPY ./dev/docker/bud/bash.bashrc /etc/bash.bashrc

RUN mkdir -p /roots
COPY ./ /roots/bud
COPY ./dev/yarn /roots/yarn
COPY ./examples/ /roots/examples/npm
COPY ./examples/ /roots/examples/yarn
