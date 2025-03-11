# Stage 1: Build Angular App
FROM node:22 as build

WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app source code and build
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve with Nginx
FROM nginx:latest

# Copy the built Angular app to the Nginx HTML folder
COPY --from=build /app/dist/YOUR_PROJECT_NAME /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
