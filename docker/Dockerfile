FROM nginx:alpine

# Install old curl to introduce known vulnerabilities for Trivy testing
# curl 8.12.1 has multiple HIGH/CRITICAL CVEs (CVE-2025-13034, CVE-2025-15224, etc.)
# Remove after testing!
RUN apk add --no-cache --repository=https://dl-cdn.alpinelinux.org/alpine/v3.21/main \
    curl=8.12.1-r0 \
    libcurl=8.12.1-r0

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy custom website
COPY site/ /usr/share/nginx/html/

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
