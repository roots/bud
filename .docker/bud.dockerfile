FROM node:lts

LABEL name 'bud'
LABEL version 1

COPY ./.docker/bud/motd /etc/motd
COPY ./.docker/bud/bash.bashrc /etc/bash.bashrc

RUN yarn global add typedoc 
RUN yarn global add netlify-cli
