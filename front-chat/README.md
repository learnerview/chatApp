# Modern Chat Application - Frontend

![Chat App Screenshot](https://via.placeholder.com/800x500/1e3a8a/ffffff?text=Chat+App+Screenshot)

A modern, real-time chat application built with React, Vite, and Tailwind CSS. This frontend application provides a sleek and responsive user interface for real-time messaging with support for multiple chat rooms and users.

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

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chat-app.git
   cd chat-app/front-chat
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

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
├── config/          # Application configuration
├── context/         # React context providers
├── services/        # API service layer
└── utils/           # Utility functions
```

## 🌐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
