FROM node:7-alpine

WORKDIR /app
COPY package.json .
COPY dist/app ./dist/app
COPY node_modules ./node_modules

EXPOSE 5000

ENTRYPOINT ["npm", "start"]
