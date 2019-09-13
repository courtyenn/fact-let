FROM node:10.13.0

WORKDIR /app

COPY package.json package.json

RUN yarn install
RUN yarn install nodemon -g

COPY . .

EXPOSE 3000

CMD [ "npm", "docker"]