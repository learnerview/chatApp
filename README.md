# Modern Chat Application

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-2.7.0-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=websocket&logoColor=white)

A full-stack real-time chat application built with React (Frontend) and Spring Boot (Backend), featuring WebSocket for instant messaging, multiple chat rooms, and a modern, responsive user interface.

## 🌟 Features

### Frontend
- 🎨 Modern, responsive UI with dark/light mode support
- 💬 Real-time messaging using WebSockets
- 👥 Multiple chat rooms support
- 📱 Mobile-friendly design
- 🚀 Built with Vite for fast development

### Backend
- ⚡ Real-time communication with WebSocket (STOMP)
- 🔒 Secure WebSocket connections
- 📊 In-memory message storage
- 🌐 RESTful API for room management
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
- Git

### Running the Application

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
   ```

2. **Start the Backend**
   ```bash
   cd chat-app-backend
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080`

3. **Start the Frontend** (in a new terminal)
   ```bash
   cd front-chat
   npm install
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## 📚 Documentation

- [Frontend Documentation](./front-chat/README.md)
- [Backend Documentation](./chat-app-backend/README.md)

## 🛠️ Built With

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Icons
- Axios
- SockJS + STOMP

### Backend
- Spring Boot 2.7.x
- Spring WebSocket
- Spring Web
- Lombok
- Spring Boot Actuator

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ✉️ Contact

Project Link: [https://github.com/your-username/chat-app](https://github.com/your-username/chat-app)

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
