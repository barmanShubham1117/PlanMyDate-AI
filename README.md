# PlanMyDate AI

AI-powered date planning app using MERN stack + Google Gemini AI.

## Tech Stack
- Node.js + Express.js
- MongoDB (Mongoose)
- Gemini AI (Free tier)
- Vanilla JavaScript frontend

## Features
1. **Date Planner** - AI-generated date itineraries
2. **Solo Mode** - Self-care date plans for singles
3. **Vibe Match** - Anonymous meetup suggestions

## Setup

### 1. Install
```bash
cd backend
npm install
```

### 2. Get Gemini API Key
https://makersuite.google.com/app/apikey

### 3. Configure
```env
# backend/.env
GEMINI_API_KEY=your_key_here
MONGODB_URI=mongodb://localhost:27017/planmydate_ai
PORT=5000
```

### 4. Start
```bash
npm start
```

## API Endpoints

**Date Planner**
```bash
POST /api/date-planner
{
  "city": "Mumbai",
  "budget": 2000,
  "dateType": "romantic",
  "partnerPersonality": "foodie"
}
```

**Solo Mode**
```bash
POST /api/solo-mode
{
  "interests": ["movies", "cafe hopping"],
  "mood": "relaxed",
  "preferredTime": "evening",
  "budget": 1500
}
```

**Vibe Match**
```bash
POST /api/vibe-match
{
  "city": "Delhi",
  "interests": ["gaming", "books"],
  "mood": "social",
  "budget": 1000,
  "preferredTime": "evening",
  "personality": "nerd"
}
```

## Rate Limits
- 15 requests/minute
- 1,500 requests/day

## Project Structure
```
backend/
├── config/          # Configuration
├── controllers/     # Request handlers
├── middleware/      # Rate limiter, validators
├── models/          # MongoDB schemas
├── routes/          # API routes
├── services/        # AI service, business logic
└── utils/           # Helpers, prompts

frontend/
├── css/
├── js/
└── index.html
```

## Documentation
- [Setup Guide](SETUP.md)
- [Rate Limiter](docs/RATE_LIMITER.md)
- [API Docs](docs/API_DOCUMENTATION.md)

## Test
```bash
node backend/test-rate-limit.js
```
