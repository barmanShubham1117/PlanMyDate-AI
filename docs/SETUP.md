# PlanMyDate AI - Setup Guide

## Overview
PlanMyDate AI is a production-style MERN stack application that uses OpenAI to generate personalized date plans and connect people with compatible vibes.

## Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (Local installation or MongoDB Atlas account)
- **OpenAI API Key** (from https://platform.openai.com)

## Installation

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies (already done if you ran npm install)
npm install

# Create .env file from template
cp .env.example .env

# Edit .env and add your values:
# - MONGODB_URI: Your MongoDB connection string
# - OPENAI_API_KEY: Your OpenAI API key
# - PORT: Server port (default: 5000)
```

### 2. Frontend Setup

The frontend is a vanilla JavaScript application in the `frontend` folder.

```bash
# No npm install needed for frontend
# Just open frontend/index.html in a browser or serve it via a local server

# OR use Python simple server (if Python is installed)
cd frontend
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

## Starting the Application

### Start Backend Server

```bash
cd backend
npm start
# Server will run on http://localhost:5000
```

### Open Frontend

```
# Option 1: Open file directly in browser
frontend/index.html

# Option 2: Serve via local server
cd frontend
python -m http.server 8000
# Open http://localhost:8000
```

## Configuration

### MongoDB Connection

**Local MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/planmydate_ai
```

**MongoDB Atlas (Cloud):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/planmydate_ai?retryWrites=true&w=majority
```

### OpenAI API

1. Get your API key from https://platform.openai.com/api-keys
2. Add to `.env` file:
```
OPENAI_API_KEY=sk-your-api-key-here
```

## Project Structure

```
PlanMyDate AI/
├── backend/
│   ├── config/       (Configuration files)
│   ├── models/       (MongoDB schemas)
│   ├── routes/       (API routes)
│   ├── controllers/  (Request handlers)
│   ├── services/     (Business logic)
│   ├── utils/        (Helper functions)
│   ├── middleware/   (Express middleware)
│   ├── app.js        (Express app)
│   ├── server.js     (Entry point)
│   └── package.json
│
├── frontend/
│   ├── js/           (JavaScript files)
│   ├── css/          (Stylesheets)
│   ├── assets/       (Images, icons, etc)
│   └── index.html    (Main HTML)
│
└── docs/             (Documentation)
```

## API Endpoints

### Health Check
- **GET** `/api/health` - Check if API is running

### Date Planner
- **POST** `/api/date-planner` - Generate couple date plan
- **GET** `/api/date-planner/:planId` - Get specific date plan
- **GET** `/api/date-planner` - Get recent date plans

### Solo Mode
- **POST** `/api/solo-mode` - Generate solo date plan with vibe matching

### Vibe Match
- **POST** `/api/vibe-match/profile` - Create anonymous vibe profile
- **POST** `/api/vibe-match/find` - Find matching vibe profile
- **GET** `/api/vibe-match/stats/:city` - Get city vibe statistics

## Features

### 1. Couple Date Planner
Users input:
- City
- Budget
- Date type (romantic, fun, casual, adventure)
- Partner personality type

Gets AI-generated:
- Hour-by-hour itinerary
- Conversation starters
- Outfit suggestions
- Estimated cost breakdown
- Mistakes to avoid
- Emergency conversation rescue lines

### 2. Solo Mode
Users input:
- City
- Interests (multiple selection)
- Mood (relaxed, energetic, social, reflective)
- Preferred time (morning, evening, night)
- Budget
- Personality type

Gets AI-generated:
- Self-care solo activities
- Confidence-building tips
- Places to visit alone
- Social exposure opportunities
- Budget breakdown

**Bonus:** Automatic vibe matching with compatible users

### 3. Vibe Match System
- Anonymous user profiles (NO personal data stored)
- Matching based on:
  - Same city (required)
  - Common interests (≥2)
  - Budget compatibility
  - Time preferences
- Generates natural meetup suggestions

## Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running locally: `mongod`
- Or update MONGODB_URI with correct connection string
- For Atlas: Check username/password and whitelist your IP

### OpenAI API Error
- Verify API key is correct in `.env`
- Check API key is active on OpenAI dashboard
- Ensure your account has available credits
- Check rate limits (may need to wait or upgrade account)

### CORS Error
- Backend CORS is set to `*` for development
- For production: Update `app.js` CORS settings

### Frontend Not Connecting to Backend
- Ensure backend is running on http://localhost:5000
- Check browser console for errors (F12)
- Verify API_BASE_URL in `frontend/js/api/client.js`

## Environment Variables

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/planmydate_ai

# OpenAI
OPENAI_API_KEY=your_api_key_here

# Server
PORT=5000
NODE_ENV=development
```

## Development Tips

### 1. Console Logging
- Backend logs show API calls and AI responses
- Frontend console (F12) shows API requests

### 2. Testing Endpoints
Use Postman or curl to test API:

```bash
# Test date planner
curl -X POST http://localhost:5000/api/date-planner \
  -H "Content-Type: application/json" \
  -d '{
    "city": "New York",
    "budget": 100,
    "dateType": "romantic",
    "partnerPersonality": "foodie"
  }'
```

### 3. MongoDB Inspection
Use MongoDB Compass or command line:
```bash
# Connect to local MongoDB
mongosh

# Use database
use planmydate_ai

# View collections
show collections

# Find date plans
db.dateplans.find()

# Find vibe profiles
db.vibeprofiles.find()
```

## Performance Tips

1. **AI Response Time**: First request may take 2-5 seconds. Subsequent requests are faster.
2. **Database Indexing**: Vibe profiles have compound indexes for fast matching
3. **Error Handling**: Frontend shows user-friendly error messages
4. **Caching**: Consider adding response caching for frequent requests

## Security Notes

- **⚠️ Development Mode**: CORS allows all origins. Restrict in production.
- **⚠️ Environment Variables**: Never commit `.env` file. Use `.env.example` as template.
- **✅ Data Privacy**: Vibe profiles store NO personal identifiable information.
- **✅ Validation**: All inputs are validated before processing.

## Next Steps

1. **Install dependencies**: `cd backend && npm install`
2. **Set up environment**: Create `.env` with MongoDB URI and OpenAI API key
3. **Start backend**: `npm start`
4. **Open frontend**: Open `frontend/index.html` in browser
5. **Test the app**: Try generating a date plan!

## Support

For issues or questions:
1. Check the console (F12) for error messages
2. Review API response in Network tab
3. Verify MongoDB and OpenAI credentials
4. Check backend console logs

---

**Made with ❤️ for teaching modern full-stack development**
