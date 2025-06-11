🔨 Chat-App

A full-stack real-time chat application built with Node.js, MongoDB, and a React-based frontend, enabling users to connect, chat, and share instantly — all containerized using Docker for seamless development and deployment.

✨ Features

🔒 User authentication and authorization

🛆 Backend built with Node.js and Express.js

🧠 MongoDB as the primary database

💬 Frontend built using React and Vite

🔄 Real-time communication (WebSockets planned for future)

☁️ Cloudinary integration for media uploads

🐳 Fully containerized using Docker & Docker Compose

📁 Environment-based configuration for production flexibility

🛠️ Tech Stack

Layer

Technology

Frontend

React + Vite

Backend

Node.js + Express

Database

MongoDB

Cloud Media

Cloudinary

Container

Docker

Orchestration

Docker Compose

🧱 Project Structure

Chat-App/
├── CLIENT/           # React frontend
│   └── Dockerfile
├── SERVER/           # Node.js backend
│   └── Dockerfile
├── .env              # Environment variables
├── docker-compose.yml
└── README.md

⚙️ Environment Variables

Backend (SERVER/.env)

PORT_NUMBER=5000
MONGO_URL=mongodb://mongo:27017/chat-db
SECRET_KEY=your-secret-key
FRONT_END_KEY=some-key
CLOUD_NAME=your-cloudinary-name
CLOUD_API_KEY=your-api-key
CLOUD_API_SECRET=your-api-secret

Frontend (CLIENT/.env)

VITE_BACKEND_URL=http://localhost:5000

🐳 Dockerized Setup

The project uses Docker Compose to run three services:

mongo — MongoDB database

backend — Express.js backend API

frontend — React frontend served via serve

🔧 Backend Dockerfile

FROM node:lts-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE ${PORT_NUMBER}
CMD [ "npm", "run", "start" ]

🎨 Frontend Dockerfile

# Stage 1: Build
FROM node:lts-slim AS builder
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve
FROM node:lts-slim
RUN npm i -g serve
WORKDIR /app
COPY --from=builder /app/dist .
EXPOSE 3000
CMD [ "serve", "-s", ".", "-l", "3000" ]

📦 docker-compose.yml

services:
  mongo:
    image: mongo
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  backend:
    build: ./SERVER
    ports:
      - "${PORT_NUMBER}:${PORT_NUMBER}"
    environment:
      - PORT=${PORT_NUMBER}
      - MONGO_URL=${MONGO_URL}
      - SECRET_KEY=${SECRET_KEY}
      - FRONT_END_KEY=${FRONT_END_KEY}
      - CLOUD_NAME=${CLOUD_NAME}
      - CLOUD_API_KEY=${CLOUD_API_KEY}
      - CLOUD_API_SECRET=${CLOUD_API_SECRET}
    depends_on:
      - mongo

  frontend:
    build: ./CLIENT
    ports:
      - "3000:3000"
    environment:
      - VITE_BACKEND_URL=${VITE_BACKEND_URL}
    depends_on:
      - backend

volumes:
  mongo-data:

🚀 How to Run

Prerequisites: Docker & Docker Compose installed

# Clone the project
git clone https://github.com/your-username/chat-app.git
cd chat-app

# Create a .env file in root and add variables

# Start the project
docker compose up --build

Visit:

Frontend: http://localhost:3000

Backend: http://localhost:5000

MongoDB: Running in the background on port 27017

