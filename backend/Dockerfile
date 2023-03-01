FROM node:16

WORKDIR /usr/src/ff-challenge-backend

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .
COPY ./config/.env.docker ./config/.env

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

EXPOSE 5000
CMD ["/bin/sh", "-c", "/wait && yarn prisma:migrate && yarn run compile && yarn run start"]