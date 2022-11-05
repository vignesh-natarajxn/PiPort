FROM node:16

WORKDIR /app/frontend

COPY package.json /app/frontend
COPY package-lock.json /app/frontend

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]