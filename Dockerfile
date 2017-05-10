FROM node:7-alpine

WORKDIR /app
COPY package.json .
COPY dist/app .
COPY node_modules .

EXPOSE 5000

ENTRYPOINT ["node", "index.js"]
