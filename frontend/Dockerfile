FROM node:20-alpine
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Pass the project name as a build argument for Next.js
ARG PROJECT_NAME
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_WS_URL

# Set them as ENV so Next.js can find them during build
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_WS_URL=$NEXT_PUBLIC_WS_URL
ENV PROJECT_NAME=$PROJECT_NAME

# Build the application
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
