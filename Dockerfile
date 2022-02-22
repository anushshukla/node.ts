FROM node:14.16.1 as base

# Create app directory
WORKDIR /usr/src/app

# Install application dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY .env ./.env
COPY src ./src
COPY configs ./configs
COPY typings ./typings

# Build dist
RUN npm run build

EXPOSE 3000
CMD ["npm","run","start"]