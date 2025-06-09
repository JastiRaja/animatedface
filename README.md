# Animated Face Project

This is a full-stack web application built with React, TypeScript, and Express.js. The project features a modern UI with Tailwind CSS and includes user authentication functionality.

## Tech Stack

- Frontend:
  - React 18
  - TypeScript
  - Vite
  - Tailwind CSS
  - Lucide React (for icons)

- Backend:
  - Express.js
  - Node.js
  - JSON file-based storage

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd animatedface
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

1. Start the backend server:
```bash
node server.cjs
```
The server will run on http://localhost:5000

2. In a new terminal, start the frontend development server:
```bash
npm run dev
```
The frontend will be available at http://localhost:5173

### Production Build

1. Build the frontend:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

## Project Structure

- `/src` - Frontend source code
- `server.cjs` - Backend Express server
- `users.json` - User data storage
- `index.html` - Main HTML file
- Configuration files:
  - `vite.config.ts` - Vite configuration
  - `tsconfig.json` - TypeScript configuration
  - `tailwind.config.js` - Tailwind CSS configuration
  - `postcss.config.js` - PostCSS configuration

## Features

- User authentication (signup/login)
- Modern UI with Tailwind CSS
- TypeScript for type safety
- Express backend with RESTful API endpoints
- CORS enabled for cross-origin requests

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Endpoints

- POST `/signup` - Register a new user
- POST `/login` - Authenticate existing user 