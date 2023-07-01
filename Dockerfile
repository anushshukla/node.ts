# Ref: https://nodejs.org/en/docs/guides/nodejs-docker-webapp

FROM node:18.16.0 as base

# Create app directory
WORKDIR /usr/src/app

# Install application dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY .npmrc .npmrc

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
# COPY .env ./.env
COPY tsconfig.json ./tsconfig.json
COPY src ./src

# Build dist
RUN npm run build

EXPOSE 3000
CMD ["npm","run","start:server"]
