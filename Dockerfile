# Use a lightweight Node image
FROM node:20-alpine

# Set working directory in the container
WORKDIR /app

# Copy dependency files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your source code
COPY . .

# Expose port 3000 for local development
EXPOSE 3000

# Start Next.js in development mode
CMD ["npm", "run", "dev"]
