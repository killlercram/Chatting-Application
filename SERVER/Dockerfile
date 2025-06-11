FROM node:lts-slim
WORKDIR /app
COPY package*.json ./ 
RUN npm ci
COPY . .
EXPOSE ${PORT_NUMBER}
CMD [ "npm","run", "start" ]
