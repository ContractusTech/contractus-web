# prod environment
FROM node:18-alpine
WORKDIR /usr/src/app

WORKDIR /usr/src/app
RUN apk add curl

ENV NEXT_TELEMETRY_DISABLED 1

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "run", "start" ]