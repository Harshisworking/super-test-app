FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
# Install only production dependencies to keep the image small
RUN npm install --production

COPY . .

# Match the port used in your server.js
EXPOSE 5000
CMD ["node", "server.js"]