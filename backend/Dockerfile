FROM node:14

WORKDIR /app/backend

COPY package.json /app/backend

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]