FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY .env ./
RUN yarn
COPY /dist ./dist
RUN ls -a
EXPOSE 8080
ENTRYPOINT yarn run start