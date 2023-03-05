FROM node:16 as build-stage

WORKDIR /usr/src/ff-challenge-frontend

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /usr/src/ff-challenge-frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
