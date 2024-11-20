# Step 1: Build the React app
FROM node:20 AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -f

# Copy the rest of the project files
COPY . .

EXPOSE 3000

# Build the app for production
RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:stable-alpine3.20-perl

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*
RUN rm -f /etc/nginx/conf.d/*.conf

# Copy the built files from the build stage to the Nginx public folder
COPY --from=builder /usr/src/app/build .

COPY default.conf /etc/nginx/conf.d/default.conf

# Copy the default Nginx config
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# build image and run container
# docker build -t fe_langgomsport .
# docker rm -f fe_langgomsport
# docker run --env-file .env --name fe_langgomsport -p 3000:80 fe_langgomsport

# push image into docker hub
# docker login
# docker tag fe_langgomsport khanhlv2004/fe_langgomsport:x.0
# docker tag fe_langgomsport khanhlv2004/fe_langgomsport:latest
# docker push khanhlv2004/fe_langgomsport:x.0
# docker push khanhlv2004/fe_langgomsport:latest