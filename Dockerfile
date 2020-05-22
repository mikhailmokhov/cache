FROM node:alpine
ARG APP_FOLDER=dist
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
COPY .env ./
RUN yarn
COPY /${APP_FOLDER} ./dist
EXPOSE 8080
ENTRYPOINT yarn run start