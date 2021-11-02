FROM node:14

COPY package.json /usr/local/app/package.json

COPY yarn.lock /usr/local/app/yarn.lock

WORKDIR /usr/local/app

RUN yarn install

COPY ./ /usr/local/app

RUN yarn build

CMD [ "yarn", "start" ]