# CodeForge

> **Online Programming Learning and Practice Platform**

CodeForge is a full-stack web application designed for interactive programming learning, problem solving, and technical practice.

---

## Tech Stack

- **Frontend**: React.js (v18), JavaScript (ES Modules), Tailwind CSS, Vite, Lucide React
- **Backend**: Node.js, Express.js (v4), Mongoose (v8), MongoDB
- **Security & Utilities**: Helmet, CORS, Morgan, Dotenv

---

## Modular Architecture

The repository enforces a strict separation of concerns between client and server layers.

```
mini project/
├── frontend/                     # React + Vite + Tailwind Client
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/           # Reusable UI primitives (Button, Card, Badge, StatusIndicator)
│   │   │   └── layout/           # Structure components (Navbar, Footer, Layout)
│   │   ├── hooks/                # Custom React hooks (useHealthCheck)
│   │   ├── pages/                # Page components (HomePage)
│   │   ├── services/             # Modular API clients (api.js)
│   │   ├── styles/               # Global CSS & Tailwind directives (index.css)
│   │   ├── utils/                # Constants and configuration
│   │   ├── App.jsx               # Application root
│   │   └── main.jsx              # React DOM entrypoint
│   ├── .env.example              # Frontend environment template
│   ├── index.html                # HTML entrypoint
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/                      # Express.js REST API
│   ├── src/
│   │   ├── config/               # Database and environment configurations
│   │   ├── controllers/          # Request handlers and response delegation
│   │   ├── middleware/           # Centralized error handling and route not found
│   │   ├── models/               # Mongoose schema registry
│   │   ├── routes/               # API endpoint routing
│   │   ├── services/             # Business logic and system metrics
│   │   ├── utils/                # Structured logger and standard API responses
│   │   ├── validators/           # Request validation middleware
│   │   ├── app.js                # Express application configuration
│   │   └── server.js             # HTTP server bootstrap and graceful shutdown
│   ├── .env.example              # Backend environment template
│   └── package.json
│
├── .env.example                  # Root combined environment template
├── .gitignore                    # Git ignore specifications
├── brain.md                      # Project architectural memory and tracking
└── README.md                     # Project documentation
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18+ (tested on v24)
- **npm**: v9+ (tested on v11)
- **MongoDB**: Local or Atlas instance (optional for initial foundation verification)

---

### Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Copy the environment configuration:
   ```bash
   cp .env.example .env
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the backend server:
   ```bash
   # Development mode with nodemon
   npm run dev

   # Or standard production mode
   npm start
   ```

   The backend will be available at `http://localhost:5000`.
   - Health endpoint: `http://localhost:5000/api/v1/health`

---

### Frontend Setup

1. Open a separate terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Copy the environment configuration:
   ```bash
   cp .env.example .env
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend client will run at `http://localhost:5173`.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Default |
|---|---|---|
| `PORT` | Port for the Express server | `5000` |
| `NODE_ENV` | Runtime environment (`development`, `production`) | `development` |
| `MONGODB_URI` | MongoDB connection connection string | `mongodb://localhost:27017/codeforge` |
| `CLIENT_URL` | Allowed origin for CORS | `http://localhost:5173` |

### Frontend (`frontend/.env`)

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Base URL for backend API requests | `http://localhost:5000/api/v1` |

---

## API Health Check Specification

### `GET /api/v1/health`

Response:
```json
{
  "success": true,
  "message": "CodeForge API is operational",
  "data": {
    "status": "healthy",
    "timestamp": "2026-10-02T16:00:00.000Z",
    "uptimeSeconds": 42,
    "database": {
      "status": "disconnected"
    },
    "system": {
      "memoryUsedMB": 38,
      "nodeVersion": "v24.15.0"
    }
  }
}
```

---

## Foundation Design Principles

1. **Separation of Concerns**: Frontend and Backend codebases are independent with dedicated configuration and dependency scopes.
2. **Clean Layered Backend**: Route &rarr; Middleware &rarr; Controller &rarr; Service &rarr; Model.
3. **No Fake Data or Users**: No mock databases, mock users, or placeholder payment systems have been added.
4. **Resilience**: The backend boots safely even if MongoDB is pending startup, and handles graceful shutdowns on `SIGINT` / `SIGTERM`.
