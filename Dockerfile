FROM node:8.9.4

WORKDIR /home/mdmz/fcm_server
COPY package*.json /home/mdmz/fcm_server/
COPY . .
RUN npm install

EXPOSE 8999
CMD npm start
