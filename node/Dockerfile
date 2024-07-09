FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Install MySQL client tools
RUN apt-get update && apt-get install -y mysql-client

EXPOSE 3000
CMD ["node", "wait-for-mysql.js"]
