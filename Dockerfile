# Use an official Node.js runtime as a base image
FROM node:LTS

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Build the React app
RUN npm run build

# Expose the port your React app runs on (usually 3000)
EXPOSE 3000

# Start the React app when the container starts
CMD [ "npm", "start" ]
