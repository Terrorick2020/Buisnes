FROM node:21.2.0

RUN mkdir /app

WORKDIR /app
COPY . /app

RUN yarn install
RUN yarn run build
EXPOSE 3000

CMD yarn start