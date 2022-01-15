FROM node:16

LABEL name 'bud'
LABEL version 1

RUN apt-get update \
    && apt-get install -y curl less wget gnupg ca-certificates \
    && apt-get clean && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

RUN npm install npm-cli-login --global

COPY --chown=node:node ./dev/docker/bud/sh/motd /etc/motd
COPY --chown=node:node ./dev/docker/bud/sh/alias.sh /home/node/alias
COPY --chown=node:node ./dev/docker/bud/sh/.bashrc /home/node/.bashrc

COPY --chown=node:node ./dev/docker/bud/bin/ci.sh /usr/local/bin/ci
COPY --chown=node:node ./dev/docker/bud/bin/up.sh /usr/local/bin/up

RUN mkdir -p /roots && chown -R node:node /roots

COPY --chown=node:node ./ /roots/bud
COPY --chown=node:node ./dev/yarn /roots/yarn
COPY --chown=node:node ./examples/ /roots/examples/npm
COPY --chown=node:node ./examples/ /roots/examples/yarn
