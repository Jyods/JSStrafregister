# Use the official Node.js image as the base image
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vue.js application
RUN npm run build

# Use the official Nginx image to serve the application
FROM nginx:alpine

# Copy the built application from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy SSL certificates into the container
COPY /nginx_ssl/fullchain.pem /etc/ssl/certs/certificate.crt
COPY /nginx_ssl/privkey.pem /etc/ssl/private/private.key

# Add this line to copy the custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 443 for HTTPS
EXPOSE 443
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
