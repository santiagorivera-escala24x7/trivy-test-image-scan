FROM nginx:1.16.0

# Vulnerable packages for Trivy scan testing
# Remove these after testing!
RUN apt-get update && apt-get install -y --no-install-recommends \
    libssl1.1=1.1.1d-0+deb10u1 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy custom website
COPY site/ /usr/share/nginx/html/

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
