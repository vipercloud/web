FROM node:7-alpine

RUN apk add curl

WORKDIR /app
COPY package.json .
COPY dist/app ./dist/app
COPY node_modules ./node_modules

EXPOSE 5000

HEALTHCHECK CMD curl --fail http://localhost:5000/ || exit 1

ENTRYPOINT ["npm", "start"]
