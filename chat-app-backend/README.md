# Chat Application - Backend

![Spring Boot](https://img.shields.io/badge/Spring_Boot-2.7.0-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Java](https://img.shields.io/badge/Java-17-007396?style=for-the-badge&logo=java&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=websocket&logoColor=white)

This is the backend service for the Modern Chat Application, built with Spring Boot and WebSocket for real-time communication.

## 🚀 Features

- Real-time messaging using WebSocket (STOMP over WebSocket)
- RESTful API for room management
- User authentication and authorization
- In-memory message storage
- CORS enabled for frontend communication
- Actuator endpoints for monitoring

## 🛠️ Prerequisites

- Java 17 or higher
- Maven 3.6.3 or higher
- Your favorite IDE (IntelliJ IDEA, Eclipse, VS Code, etc.)

## 🏗️ Project Structure

```
src/main/java/com/chat/app/
├── config/          # Configuration classes
├── controller/      # REST and WebSocket controllers
├── model/           # Entity/DTO classes
├── repository/      # Data access layer
├── service/         # Business logic
└── ChatApplication.java  # Main application class
```

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chat-app.git
   cd chat-app/chat-app-backend
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The application will start on `http://localhost:8080`.

## 🌐 API Endpoints

### WebSocket Endpoints

- **WebSocket Connection**: `ws://localhost:8080/ws`
- **Message Broker**: `/topic`
- **Application Destination Prefix**: `/app`

### REST API Endpoints

#### Room Management
- `POST /api/rooms` - Create a new chat room
- `GET /api/rooms/{roomId}` - Get room details
- `POST /api/rooms/{roomId}/join` - Join an existing room

## ⚙️ Configuration

Application properties can be configured in `src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080

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

## 📊 Monitoring

Actuator endpoints are enabled for monitoring:
- Health: `GET /actuator/health`
- Info: `GET /actuator/info`
- Metrics: `GET /actuator/metrics`

## 🐳 Docker Support

Build a Docker image:

```bash
docker build -t chat-app-backend .
```

Run the container:

```bash
docker run -p 8080:8080 chat-app-backend
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✉️ Contact

Project Link: [https://github.com/your-username/chat-app](https://github.com/your-username/chat-app)
