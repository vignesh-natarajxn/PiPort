FROM node:14

WORKDIR /app/backend

COPY package.json /app/backend

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]