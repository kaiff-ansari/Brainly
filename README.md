# 🧠 SecondBrain

> A modern, full-stack personal knowledge management and content curation web application. Save, organize, and share your favorite YouTube videos, Twitter/X posts, and web articles in one unified digital workspace.

---

## 🌐 Live Demo

🚀 **Live Application:** [Visit SecondBrain](YOUR_DEPLOYMENT_URL)

---

## ✨ Features

- **Multi-Format Content Curation**
  - 🎥 **YouTube Videos:** Embedded video player with support for standard links, `youtu.be`, and `/shorts/`.
  - 🐦 **Twitter / X Posts:** Dynamic tweet cards rendered via Twitter widgets.
  - 📄 **Web Articles & Blogs:** Clean article preview cards with direct links and domain previews.

- **🔗 Shareable Brain**
  - Generate a unique, public share link in one click.
  - Share your curated knowledge base with friends or colleagues in read-only mode without requiring login.

- **🗂️ Instant Category Filtering**
  - Filter content by **All Notes**, **YouTube**, **Twitter / X**, and **Articles** directly from the sidebar.

- **🔐 Secure Authentication**
  - User registration and login using **JSON Web Tokens (JWT)** and **bcrypt** password hashing.
  - Route protection and sanitized responses.

- **📱 Responsive & Modern UI**
  - Built with **React 19** and **Tailwind CSS v4**.
  - Mobile-responsive navigation drawer with a hamburger menu.
  - Smooth scrolling and clean, custom scrollbars.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 (TypeScript)
- **Bundler & Tooling:** Vite 8
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **HTTP Client:** Axios
- **Linting:** Oxlint

### Backend
- **Runtime:** Node.js
- **Framework:** Express (ES Modules)
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (`jsonwebtoken`) & `bcrypt`

---

## 📂 Project Structure

```text
SecondBrain/
├── Brainly_Backend/
│   ├── src/
│   │   ├── config/           # Database connection (MongoDB)
│   │   ├── controller/       # Application controllers
│   │   ├── middleware/       # JWT authentication middleware
│   │   ├── models/           # Mongoose data models
│   │   ├── routes/           # Express route definitions
│   │   ├── utils.ts          # Hashing and utility functions
│   │   └── index.ts          # Express server entry point
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── brainly-frontend/
│   ├── src/
│   │   ├── assets/           # Static images and icons
│   │   ├── components/       # Reusable UI components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── icons/             # SVG icon components
│   │   ├── pages/             # Application pages
│   │   ├── config.ts         # Backend URL configuration
│   │   ├── App.tsx            # Route setup
│   │   └── main.tsx           # Application entry point
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)

### 1. Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd Brainly_Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables.

   Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

   Update your `.env` file:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/secondbrain
   JWT_SECRET=your_super_secret_jwt_key
   ```

4. Build and start the backend:

   ```bash
   # Development
   npm run dev

   # Production build
   npm run build
   npm start
   ```

   The backend will run on `http://localhost:5000`.

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

   ```bash
   cd brainly-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables.

   Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

   Update your `.env` file:

   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```

4. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`.

---
