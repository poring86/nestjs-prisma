FROM node:20.5.1-slim

RUN apt-get update -y && apt-get install -y openssl

RUN npm install -g @nestjs/cli@10.1.17 prisma

USER root

WORKDIR /home/node/app

# RUN chmod -R 777 ./

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

# CMD ["npm", "run", "start:dev"]