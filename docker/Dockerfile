FROM nginx:alpine

# Old nginx:1.21-alpine has known CRITICAL/HIGH CVEs in bundled libraries
# (zlib, libssl, libcrypto, etc.)
# Switch back to nginx:alpine after testing!

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy custom website
COPY site/ /usr/share/nginx/html/

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
