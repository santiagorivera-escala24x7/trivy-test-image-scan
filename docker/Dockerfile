FROM debian:trixie-slim

# Match the same packages as phoenix-mid-hub-api-prod
# Base: Debian Trixie with Node.js 26.5.0, OpenJDK 21, Chromium

ARG NODE_VERSION=26.5.0

# System packages (same as prod image)
RUN apt-get update && apt-get upgrade -y && apt-get install -y --no-install-recommends \
    ca-certificates \
    wget \
    unzip \
    xz-utils \
    procps \
    bash \
    libatomic1 \
    openjdk-21-jdk \
    chromium \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libx11-6 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libnss3 \
    libxss1 \
    libxtst6 \
    && apt-get purge -y --auto-remove \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js (same version as prod)
RUN wget -q "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz" \
    && tar -xJf "node-v${NODE_VERSION}-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
    && rm "node-v${NODE_VERSION}-linux-x64.tar.xz" \
    && node --version && npm --version

# Install same global npm packages as prod
RUN npm install -g pm2@7.0.1 ws@8.21.0 js-yaml@4.3.0

# Create app user
RUN useradd -m -s /bin/bash node || true

# Create a simple Express app to simulate the service
WORKDIR /home/node/app
RUN npm init -y && npm install express@4.21.2

COPY app.js /home/node/app/

RUN chown -R node:node /home/node

USER node

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV TZ=America/Mexico_City

EXPOSE 3000

CMD ["node", "app.js"]
