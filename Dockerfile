# Use Node.js v20 as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy the package files to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the remaining application files
COPY . .

# Document the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start", "ionic", "serve", "--host", "0.0.0.0", "--port", "3000", "--no-open"]