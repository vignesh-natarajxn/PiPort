FROM node:16

WORKDIR /app/backend

COPY package.json /app/backend
COPY package-lock.json /app/backend

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]