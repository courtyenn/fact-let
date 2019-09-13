FROM node:10.13.0

WORKDIR /app

COPY package.json package.json

RUN yarn install --force

RUN npm rebuild node-sass

COPY . .

EXPOSE 3000

CMD [ "npm", "start"]