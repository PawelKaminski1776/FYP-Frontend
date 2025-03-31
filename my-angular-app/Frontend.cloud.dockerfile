# Stage 1: Build Angular App
FROM node:22 as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . . 
RUN npm run build -- --configuration production

# Stage 2: Serve with Nginx
FROM nginx:latest

# Copy the built Angular app to the Nginx HTML folder
COPY --from=build /app/dist/my-angular-app /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose the correct port
EXPOSE 8080

# Start Nginx with correct port
CMD ["sh", "-c", "envsubst '$$PORT' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]

