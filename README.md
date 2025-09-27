# chatApp

Spring Boot MVC chat application with WebSocket (STOMP), MongoDB, and session-based authentication.

## Features
- Register / Login (Spring Security + BCrypt)
- Create / Join rooms via input box
- Real-time chat (WebSocket + STOMP)
- Typing indicator (`/topic/typing/{roomId}`)
- Message persistence in MongoDB
- Pagination of messages (20 per page)
- Thymeleaf templates + Bootstrap for simple UI
- Logout and user display in navbar
- Service layer, flash messages, demo script

## Prerequisites
- Java 17+
- Maven
- MongoDB running locally on `mongodb://localhost:27017` (database `chatdb`)

## Run
1. Start MongoDB (e.g., `mongod`).
2. Build and run:
   ```bash
   mvn clean package
   mvn spring-boot:run
   ```
3. Open `http://localhost:8080/login`

## Default Flow
1. Register at `/register`
2. Log in at `/login`
3. Create or join a room at `/rooms`
4. Chat in real-time

## Notes
- CSRF is enabled; Thymeleaf forms include CSRF tokens.
- WebSocket STOMP endpoint: `/chat`
- Topic for messages: `/topic/room/{roomId}`
- Topic for typing: `/topic/typing/{roomId}`
