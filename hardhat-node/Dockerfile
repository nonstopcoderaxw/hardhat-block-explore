FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/hardhat-node

# Copy files
COPY package*.json ./
COPY hardhat.config.ts ./
COPY tsconfig.json ./

# Install packages
RUN yarn

EXPOSE 8545

CMD [ "npx", "hardhat", "node" ]
