# Modern Chat Application

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.1.0-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=websocket&logoColor=white)

A full-stack real-time chat application built with React (Frontend) and Spring Boot (Backend) with MongoDB, featuring WebSocket for instant messaging, multiple chat rooms, and a modern, responsive user interface.

## 🌟 Features

### Frontend
- 🎨 Modern, responsive UI with dark/light mode support
- 💬 Real-time messaging using WebSockets
- 👥 Multiple chat rooms support
- 📱 Mobile-friendly design
- 🚀 Built with Vite for fast development

### Backend
- ⚡ Real-time communication with WebSocket (STOMP)
- 🗄️ MongoDB for data persistence
- 🔒 Secure WebSocket connections
- 🌐 RESTful API for room and user management
- 📡 Actuator endpoints for monitoring

## 🏗️ Project Structure

```
chat-app-main/
├── front-chat/          # React frontend application
│   ├── src/             # Source code
│   ├── public/          # Static files
│   └── package.json     # Frontend dependencies
│
└── chat-app-backend/    # Spring Boot backend application
    ├── src/             # Source code
    ├── pom.xml          # Maven configuration
    └── application.properties  # Backend configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn (for frontend)
- Java 17+ and Maven (for backend)
- MongoDB 6.0+
- Git

### Running the Application

1. **Clone the repository**
   ```bash
   git clone https://github.com/learnerview/chatApp.git
   cd chatApp
   ```

2. **Start MongoDB**
   - Make sure MongoDB is running locally on the default port (27017)
   - Or update the MongoDB connection string in `chat-app-backend/src/main/resources/application.properties`

3. **Start the Backend**
   ```bash
   cd chat-app-backend
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080`

4. **Start the Frontend** (in a new terminal)
   ```bash
   cd front-chat
   npm install
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## 🛠️ Built With

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Icons
- Axios
- SockJS + STOMP

### Backend
- Spring Boot 3.1.x
- Spring WebSocket
- Spring Data MongoDB
- Spring Security
- Lombok
- Spring Boot Actuator

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📝 Project Link

GitHub: [https://github.com/learnerview/chatApp](https://github.com/learnerview/chatApp)
