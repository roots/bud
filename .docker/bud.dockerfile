FROM node:lts

LABEL name 'bud'
LABEL version 1

COPY ./.docker/bud/motd /etc/motd
COPY ./.docker/bud/bash.bashrc /etc/bash.bashrc
