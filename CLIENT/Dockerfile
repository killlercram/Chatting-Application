#Stage 1:Building the Application
FROM node:18-alpine AS builder

#Setting working directory inside the docker image
WORKDIR /app

#Installing the dependencies
COPY package*.json ./
RUN npm ci

#Coping rest of the application code and building the app
COPY . .
RUN npm run build


#Stage 2: Server Stage
FROM node:18-alpine

#installing static file server
RUN npm i -g serve

#Coping the build files From previous stage
WORKDIR /app
COPY --from=builder /app/dist .

#Exposing the app's port manually
EXPOSE 5000

CMD [ "serve", "-s", ".", "-l", "5000" ]



