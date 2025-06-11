#Stage 1:Building the Application
FROM node:lts-slim AS builder

# ARG VITE_BACKEND_URL
# ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}


#Setting working directory inside the docker image
WORKDIR /app

#Installing the dependencies
COPY package*.json ./
RUN npm ci

#Coping rest of the application code and building the app
COPY . .
RUN npm run build


#Stage 2: Server Stage
FROM node:lts-slim

#installing static file server
RUN npm i -g serve

#Coping the build files From previous stage
WORKDIR /app
COPY --from=builder /app/dist .

#Exposing the app's port manually
EXPOSE 3000

CMD [ "serve", "-s", ".", "-l", "3000" ]



