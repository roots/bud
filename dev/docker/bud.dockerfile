FROM node:16

LABEL name 'bud'
LABEL version 1

ENV DOCKER_BUILDKIT=1

RUN apt-get update \
    && apt-get install -y curl less wget gnupg ca-certificates \
    && apt-get clean && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

RUN npm install npm-cli-login --global

COPY --chown=node:node ./dev/docker/bud/dotfiles/motd /etc/motd
COPY --chown=node:node ./dev/docker/bud/dotfiles/alias.sh /home/node/alias
COPY --chown=node:node ./dev/docker/bud/dotfiles/.bashrc /home/node/.bashrc

COPY --chown=node:node ./dev/docker/bud/bin/ci.sh /usr/local/bin/ci
COPY --chown=node:node ./dev/docker/bud/bin/reset_integration.sh /usr/local/bin/reset_integration
COPY --chown=node:node ./dev/docker/bud/bin/yarn_plugin_build.sh /usr/local/bin/yarn_plugin_build

RUN mkdir -p /roots && chown -R node:node /roots

COPY --chown=node:node ./ /roots/bud
COPY --chown=node:node ./dev/yarn /roots/yarn
COPY --chown=node:node ./examples/ /roots/examples/npm
COPY --chown=node:node ./examples/ /roots/examples/yarn

