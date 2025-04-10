# Stage 1: Build Angular App
FROM node:22 as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . . 
RUN NODE_OPTIONS="--max_old_space_size=2048" npm run build -- --configuration production

# Stage 2: Serve with Nginx
FROM nginx:latest

# Copy the built Angular app to the Nginx HTML folder
COPY --from=build /app/dist/my-angular-app /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]