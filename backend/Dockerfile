# Use a Node.js base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend application code
COPY . .

# Expose the port your backend runs on (assuming 3001)
EXPOSE 3001

# The command to start your application (using nodemon for development)
CMD [ "npm", "start" ]