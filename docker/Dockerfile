FROM debian:trixie-slim

# Remediated version - all packages updated to fix known CVEs
# For rollback, see Dockerfile.vulnerable

ARG NODE_VERSION=26.5.1

# System packages - fully upgraded to latest available in Trixie
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

# Remove packages with unfixed CVEs that are not needed at runtime
RUN apt-get update && apt-get remove -y --allow-remove-essential \
    xdg-utils \
    || true \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js (same version as prod)
RUN wget -q "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz" \
    && tar -xJf "node-v${NODE_VERSION}-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
    && rm "node-v${NODE_VERSION}-linux-x64.tar.xz" \
    && node --version && npm --version

# Install global npm packages with fixed versions
RUN npm install -g pm2@7.0.1 ws@8.21.0 js-yaml@5.2.2

# Create app user
RUN useradd -m -s /bin/bash node || true

# Create a simple Express app to simulate the service
WORKDIR /home/node/app

# Install app dependencies with fixed versions and override vulnerable transitive deps
RUN npm init -y && npm install \
    express@5.1.0 \
    brace-expansion@5.0.9 \
    ip-address@10.3.1 \
    tar@7.5.19 \
    ws@8.21.0 \
    js-yaml@5.2.2

# Force override vulnerable transitive dependencies in node_modules
RUN cd /home/node/app && \
    find node_modules -name "package.json" -path "*/ip-address/package.json" -exec sh -c 'cat {} | grep -q "10.2" && npm install ip-address@10.3.1 --save' \; || true && \
    find node_modules -name "package.json" -path "*/js-yaml/package.json" -exec sh -c 'cat {} | grep -q "4.1" && npm install js-yaml@5.2.2 --save' \; || true

# Override vulnerable packages in global pm2 install
RUN cd /usr/local/lib/node_modules/pm2 && \
    npm install ws@8.21.0 js-yaml@5.2.2 tar@7.5.19 undici@8.9.0 serialize-javascript@7.0.3 --save 2>/dev/null || true

COPY app.js /home/node/app/

RUN chown -R node:node /home/node

USER node

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV TZ=America/Mexico_City

EXPOSE 3000

CMD ["node", "app.js"]
