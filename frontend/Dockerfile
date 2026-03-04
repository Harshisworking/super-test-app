FROM node:20-alpine
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Pass the project name as a build argument for Next.js
ARG PROJECT_NAME
ENV PROJECT_NAME=$PROJECT_NAME

# Build the application
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]