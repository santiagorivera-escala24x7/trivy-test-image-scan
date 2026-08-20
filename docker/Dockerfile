FROM nginx:1.16.0

# Using old base image intentionally for Trivy scan testing
# This image has known CRITICAL/HIGH CVEs
# Remove and switch back to nginx:alpine after testing!

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy custom website
COPY site/ /usr/share/nginx/html/

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
