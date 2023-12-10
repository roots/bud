FROM node:lts

LABEL name 'bud'
LABEL version 1

RUN apt-get update \
    && apt-get install -y curl less wget gnupg ca-certificates \
    && apt-get clean && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64,arm64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update apt-get install -yq --no-install-recommends \
       fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    && apt-get install -yq --no-install-recommends \
       gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
       libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
       libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
       libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates \
       fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils --no-install-recommends \
    && apt-get install -yq google-chrome-stable \
    && apt-get clean && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*
