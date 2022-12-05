FROM node:alpine

COPY . /app

WORKDIR /app

RUN npm install

RUN npx tsc

ENTRYPOINT cd dist && npm start
