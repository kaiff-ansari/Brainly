# 🧠 SecondBrain

> A modern, full-stack personal knowledge management and content curation web application. Save, organize, and share your favorite YouTube videos, Twitter/X posts, and web articles in one unified digital workspace.

---

## ✨ Features

- **Multi-Format Content Curation**:
  - 🎥 **YouTube Videos**: Embedded video player with support for standard links, `youtu.be`, and `/shorts/`.
  - 🐦 **Twitter / X Posts**: Live dynamic tweet cards rendered via Twitter widgets.
  - 📄 **Web Articles & Blogs**: Clean article preview cards with direct links and domain previews.
- **🔗 Shareable Brain**:
  - Generate a unique, public share link in one click.
  - Share your curated knowledge base with friends or colleagues in read-only mode without requiring login.
- **🗂️ Instant Category Filtering**:
  - Filter content by **All Notes**, **YouTube**, **Twitter / X**, and **Articles** directly from the sidebar.
- **🔐 Secure Authentication**:
  - User registration and login using **JSON Web Tokens (JWT)** and **bcrypt** password hashing.
  - Route protection and sanitized API responses.
- **📱 Responsive & Modern UI**:
  - Built with **React 19** and **Tailwind CSS v4**.
  - Mobile-responsive slide-out navigation drawer with a hamburger menu on small devices.
  - Single-panel smooth scrolling with clean, custom scrollbars.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (TypeScript)
- **Bundler & Tooling**: Vite 8
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Linting**: Oxlint

### Backend
- **Runtime**: Node.js
- **Framework**: Express (ES Modules)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (`jsonwebtoken`) & `bcrypt`

---

## 📂 Project Structure

```text
SecondBrain/
├── Brainly_Backend/          # Express REST API Server
│   ├── src/
│   │   ├── config/           # Database connection (MongoDB)
│   │   ├── controller/       # Route controllers (Auth, Content, Link, Tag)
│   │   ├── middleware/       # JWT Auth Middleware
│   │   ├── models/           # Mongoose Data Models (User, Content, Link, Tag)
│   │   ├── routes/           # Express Route definitions
│   │   ├── utils.ts          # Hash & utility functions
│   │   └── index.ts          # Express Server entry point
│   ├── .env.example          # Backend environment template
│   ├── package.json
│   └── tsconfig.json
│
├── brainly-frontend/         # React SPA Frontend
│   ├── src/
│   │   ├── assets/           # Static images & icons
│   │   ├── components/       # Reusable UI (Sidebar, Card, Button, Modal, Inputs)
│   │   ├── hooks/            # Custom React hooks (useContent)
│   │   ├── icons/            # SVG Icon components
│   │   ├── pages/            # Page Views (Dashboard, Signin, Signup)
│   │   ├── config.ts         # API URL configuration
│   │   ├── App.tsx           # Route setup
│   │   └── main.tsx          # Application entry point
│   ├── .env.example          # Frontend environment template
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)

---

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd Brainly_Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your settings:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/secondbrain
   JWT_SECRET=your_super_secret_jwt_key
   ```

4. Build and start the backend server:
   ```bash
   # Development (compile & run)
   npm run dev

   # Production build
   npm run build
   npm start
   ```
   *The backend will run on `http://localhost:5000`.*

---

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd brainly-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Update `.env`:
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`.*

---

## 📡 API Reference

### Authentication
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Register a new user | ❌ |
| `POST` | `/api/v1/auth/login` | Log in and receive JWT token | ❌ |

### Content Management
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/v1/content` | Fetch all content for authenticated user | ✅ Bearer Token |
| `POST` | `/api/v1/content` | Add new content (YouTube, Twitter, Article) | ✅ Bearer Token |
| `DELETE`| `/api/v1/content/:id` | Delete a content item by ID | ✅ Bearer Token |

### Brain Sharing
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/v1/brain/share` | Generate or toggle public shareable link | ✅ Bearer Token |
| `GET` | `/api/v1/brain/:hash` | Publicly view shared user's content | ❌ |

### Tags
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/v1/tags` | Fetch all tags | ❌ |
| `POST` | `/api/v1/tags` | Create a new tag | ❌ |
| `DELETE`| `/api/v1/tags/:id` | Delete a tag by ID | ❌ |

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
