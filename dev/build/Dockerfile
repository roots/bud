FROM ubuntu

LABEL name 'bud'
LABEL version 1

RUN apt update \
    && apt install -yq chromium-browser curl \
    && apt clean && apt autoremove -y && rm -rf /var/lib/apt/lists/*

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install 16.3.0
RUN . "$NVM_DIR/nvm.sh" && nvm use v16.3.0
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v16.3.0

ENV PATH="/root/.nvm/versions/node/v16.3.0/bin/:${PATH}"

RUN node --version
RUN npm --version
