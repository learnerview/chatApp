# Chat Application - Frontend

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A modern, real-time chat application frontend built with React, Vite, and Tailwind CSS. This application provides a sleek and responsive user interface for real-time messaging with support for multiple chat rooms and users.

## ✨ Features

- 🎨 Modern, responsive UI with dark/light mode support
- 💬 Real-time messaging using WebSockets
- 👥 Multiple chat rooms support
- 📱 Mobile-friendly design
- 🚀 Built with Vite for fast development and production builds
- 🎨 Styled with Tailwind CSS for rapid UI development

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ (LTS recommended)
- npm or yarn package manager
- Backend server running (see [backend README](../chat-app-backend/README.md))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/learnerview/chatApp.git
   cd chatApp/front-chat
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:
   Create a `.env` file in the `front-chat` directory with:
   ```env
   VITE_API_BASE_URL=http://localhost:8080
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
# or
yarn build
```

This will create a `dist` folder with the production build.

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **WebSocket**: SockJS + STOMP
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable UI components
│   ├── ChatPage.jsx # Main chat interface
│   ├── JoinCreateChat.jsx # Join/Create room component
│   └── ...
├── config/          # Application configuration
└── utils/           # Utility functions
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests to the [GitHub repository](https://github.com/learnerview/chatApp).

## 🔗 Related

- [Backend Documentation](../chat-app-backend/README.md)
- [Project Repository](https://github.com/learnerview/chatApp)
