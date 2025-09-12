# Chat Application - Backend

![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.1.0-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Java](https://img.shields.io/badge/Java-17-007396?style=for-the-badge&logo=java&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=websocket&logoColor=white)

This is the backend service for the Modern Chat Application, built with Spring Boot, MongoDB, and WebSocket for real-time communication.

## 🚀 Features

- Real-time messaging using WebSocket (STOMP over WebSocket)
- MongoDB for persistent data storage
- User authentication and authorization
- RESTful API for room and message management
- CORS enabled for frontend communication
- Actuator endpoints for monitoring

## 🛠️ Prerequisites

- Java 17 or higher
- Maven 3.6.3 or higher
- MongoDB 6.0+ (running locally or accessible)
- Your favorite IDE (IntelliJ IDEA, Eclipse, VS Code, etc.)

## 🏗️ Project Structure

```
src/main/java/com/chat/app/
├── config/          # Configuration classes
├── controller/      # REST and WebSocket controllers
├── model/           # MongoDB document models
├── repository/      # MongoDB repositories
├── service/         # Business logic
└── ChatApplication.java  # Main application class
```

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/learnerview/chatApp.git
   cd chatApp/chat-app-backend
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run MongoDB:
   - Make sure MongoDB is running locally on the default port (27017)
   - Or update the connection string in `application.properties`

4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The application will start on `http://localhost:8080`.

## 🌐 API Endpoints

### WebSocket Endpoints
- **WebSocket Connection**: `ws://localhost:8080/ws`
- **Send Message**: `/app/sendMessage/{roomId}`
- **Subscribe to Messages**: `/topic/room/{roomId}`

### REST API Endpoints (Base Path: /api/v1/rooms)

#### Room Management
- `POST /api/v1/rooms` - Create a new chat room
  - Request Body: `String roomId`
  - Returns: Created room or error if room already exists

- `GET /api/v1/rooms/{roomId}` - Join an existing room
  - Returns: Room details or error if room not found

#### Message Endpoints
- `GET /api/v1/rooms/{roomId}/messages` - Get paginated messages for a room
  - Query Parameters:
    - `page` (default: 0) - Page number (0-based)
    - `size` (default: 20) - Number of messages per page
  - Returns: List of messages for the specified room

## ⚙️ Configuration

Application properties can be configured in `src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080

# MongoDB Configuration
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=chatdb

# WebSocket Configuration
websocket.endpoint=/ws
websocket.topic.prefix=/topic
websocket.application.prefix=/app

# CORS Configuration
cors.allowed-origins=http://localhost:5173

# Logging
logging.level.org.springframework.web=INFO
logging.level.com.chat=DEBUG
```

## 🧪 Testing

Run the test suite with:

```bash
mvn test
```

## 🛠️ Dependencies

- Spring Boot 3.1.x
- Spring Data MongoDB
- Spring WebSocket
- Spring Security
- Lombok
- Spring Boot Actuator
- Spring Boot DevTools (development)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests to the [GitHub repository](https://github.com/learnerview/chatApp).

## 🔗 Related

- [Frontend Documentation](../front-chat/README.md)
- [Project Repository](https://github.com/learnerview/chatApp)
