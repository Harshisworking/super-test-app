FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Match the port for WebSocket connections
EXPOSE 8080

# Start the dedicated WS server
CMD ["node", "index.js"]