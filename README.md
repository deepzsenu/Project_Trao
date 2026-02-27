

# 🌦 Project Trao — AI-Powered Weather Intelligence Dashboard

Live Frontend:
👉 [https://project-trao.vercel.app/](https://project-trao.vercel.app/)

Live Backend API:
👉 [https://project-trao-backend.onrender.com/](https://project-trao-backend.onrender.com/)

---

# 📌 Project Overview

Project Trao is a full-stack, AI-powered Weather Intelligence Dashboard that enables users to:

* Securely register and log in
* Add and manage multiple cities
* View real-time weather data
* Mark cities as favorites
* Search and filter cities
* Interact with an AI agent for contextual weather insights

Unlike a simple weather application, this system integrates a context-aware AI assistant that analyzes user-specific weather data and provides intelligent recommendations, comparisons, and summaries.

The project demonstrates:

* Secure authentication & authorization
* Multi-user data isolation
* Clean architecture and separation of concerns
* Real-time API integration
* Optimistic UI updates
* AI agent integration using LangChain + Gemini
* Modern responsive UI/UX

---

# 🧱 Tech Stack

## Frontend

* React (with Vite)
* Tailwind CSS
* React Router
* Axios
* Framer Motion
* React Hot Toast

### Why React + Vite?

* Fast development experience
* Lightweight and modern build tooling
* Excellent ecosystem support

### Why Tailwind CSS?

* Utility-first styling
* Rapid UI development
* Consistent responsive design
* Clean, maintainable styling system

---

## Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (Authentication)
* Bcrypt (Password hashing)
* Axios (OpenWeather API)
* LangChain
* Google Gemini (AI Model)

### Why Express?

* Minimal and flexible
* Clean middleware architecture
* Excellent for REST APIs

### Why MongoDB?

* Flexible schema
* Natural fit for user-specific data
* Easy document association between users and cities

### Why LangChain + Gemini?

* Structured AI integration
* Ability to reason over real user data
* Free-tier friendly (Gemini 2.5 Flash)
* Production-grade AI architecture

---

# 🚀 Setup Instructions

## 🔹 Local Setup

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd weather-dashboard
```

---

## 🔹 Backend Setup

```bash
cd weather-dashboard-backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
OPENWEATHER_API_KEY=your_openweather_key
GEMINI_API_KEY=your_gemini_key
```

Start backend:

```bash
npm start
```

Server runs on:

```
http://localhost:5000
```

---

## 🔹 Frontend Setup

```bash
cd weather-dashboard-frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

# 🌍 Deployment

## Frontend

* Hosted on Vercel
* URL: [https://project-trao.vercel.app/](https://project-trao.vercel.app/)

## Backend

* Hosted on Render
* URL: [https://project-trao-backend.onrender.com/](https://project-trao-backend.onrender.com/)

## Database

* MongoDB hosted on Railway

---

# 🏗 High-Level Architecture

```
Frontend (React + Vite)
        ↓
Backend (Express API)
        ↓
MongoDB (User Data)
        ↓
OpenWeather API (Weather Data)
        ↓
Gemini AI (LangChain Agent)
```

---

## Data Flow

1. User authenticates via JWT.
2. Cities are stored in MongoDB with user association.
3. Weather data fetched dynamically from OpenWeather API.
4. AI agent receives:

   * User question
   * Real-time user weather data
5. AI generates contextual response.
6. Response returned to frontend chatbot.

---

# 🔐 Authentication & Authorization

Authentication is implemented using:

* JWT (JSON Web Token)
* Bcrypt password hashing
* Protected routes middleware

### Flow:

1. User registers → password hashed.
2. User logs in → JWT issued.
3. JWT stored on frontend.
4. All protected routes require Bearer token.
5. Middleware verifies token and attaches `req.user`.

Example:

```js
City.find({ user: req.user.id })
```

This ensures:

* Complete data isolation
* Users cannot access other users' cities
* Favorites remain user-specific
* AI queries only analyze authenticated user data

---

# 🤖 AI Agent Design & Purpose

## Purpose

The AI Agent transforms the dashboard from a weather viewer into a weather intelligence system.

It allows users to:

* Ask natural language questions
* Compare cities
* Get weather-based recommendations
* Receive contextual advice

Examples:

* “Which city is hottest right now?”
* “Should I carry an umbrella?”
* “Which city is best for outdoor activities?”
* “Summarize my favorite cities weather.”

---

## AI Architecture

Backend AI route:

```
POST /api/ai
```

Process:

1. Fetch authenticated user's cities
2. Fetch real-time weather for each city
3. Structure weather data
4. Send structured data + user question to Gemini
5. Return concise, contextual answer

### Model Used

* Gemini 2.5 Flash
* Integrated via LangChain

Why Gemini?

* Free-tier availability
* Strong reasoning
* Fast responses
* Suitable for job assignment constraints

---

## Why This Is Meaningful AI Integration

This is NOT a generic chatbot.

It:

* Uses real-time structured app data
* Respects user isolation
* Provides contextual reasoning
* Is integrated into backend architecture
* Avoids hallucination by constraining data

---

# 🌟 Creative / Custom Features

## 1️⃣ AI Weather Chatbot Popup

* Floating chatbot UI
* Context-aware AI assistant
* Animated popup
* Secure backend integration

## 2️⃣ Favorites Differentiation

* Favorite cities visually distinct
* Persistent across sessions
* User-specific state

## 3️⃣ Dynamic Background

* Background adapts based on weather condition
* Smooth transitions

## 4️⃣ Optimistic UI Updates

* Instant city addition
* Instant favorite toggle
* Instant deletion
* Rollback on failure

## 5️⃣ Search & Filtering

* Real-time search
* Favorite-priority sorting

## 6️⃣ Animations

* Framer Motion animations
* Smooth card transitions
* Hover effects
* Chat popup animation

## 7️⃣ Skeleton Loaders

* Improved perceived performance
* Smooth loading experience

---

# 🧠 Key Design Decisions & Trade-offs

## Decision 1: Backend AI Instead of Frontend AI

Reason:

* API key security
* Prevent key exposure
* Controlled AI context
* User isolation

Trade-off:

* Slightly increased backend load

---

## Decision 2: Fetch Weather on Each Dashboard Load

Reason:

* Always fresh data
* Avoid stale weather

Trade-off:

* More API calls

---

## Decision 3: Optimistic UI Updates

Reason:

* Better UX
* Feels instant

Trade-off:

* Requires rollback handling

---

## Decision 4: No AI Conversation Memory (Currently)

Reason:

* Simpler architecture
* Lower token usage
* Faster responses

Trade-off:

* Stateless responses

---

# ⚠ Known Limitations

* No long-term AI memory (stateless agent)
* Weather API rate limits possible
* Gemini free tier limits (RPM/TPM constraints)
* No offline caching
* No pagination for very large city lists

---

# 📈 Future Improvements

* Streaming AI responses
* Tool-based AI agent
* AI auto-weather summary button
* Hourly forecast visualization
* Weather trend analytics
* Caching layer for weather data
* Role-based user management

---

# 🏁 Conclusion

Project Trao demonstrates:

* Secure full-stack development
* Clean architecture
* Modern UI/UX design
* AI agent integration
* Context-aware reasoning
* User data isolation
* Production-ready deployment

