FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/prisma

# Copy files
COPY package*.json ./
COPY prisma/ ./prisma


# Install packages
RUN yarn

EXPOSE 5555
CMD [ "yarn", "prisma:schema:update" ]
CMD [ "yarn", "prisma:studio" ]

