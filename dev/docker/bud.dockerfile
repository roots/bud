FROM node:16

LABEL name 'bud'
LABEL version 1

ENV DOCKER_BUILDKIT=1

RUN apt-get update \
    && apt-get install -y curl less wget gnupg ca-certificates \
    && apt-get clean && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

RUN npm install npm-cli-login --global

COPY ./dev/docker/bud/dotfiles/motd /etc/motd
COPY ./dev/docker/bud/dotfiles/bash.bashrc /etc/bash.bashrc

COPY ./dev/docker/bud/bin/ci.sh /bin/ci
COPY ./dev/docker/bud/bin/reset_integration.sh /bin/reset_integration
COPY ./dev/docker/bud/bin/yarn_plugin_build.sh /bin/yarn_plugin_build

RUN mkdir -p /roots
COPY ./ /roots/bud
COPY ./dev/yarn /roots/yarn
COPY ./examples/ /roots/examples/npm
COPY ./examples/ /roots/examples/yarn

