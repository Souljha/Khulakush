# Stage 1: Build the React application
FROM node:20-alpine AS build

ARG VITE_APP_BACKEND_URL
ENV VITE_APP_BACKEND_URL=$VITE_APP_BACKEND_URL

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/public /usr/share/nginx/html/public
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
