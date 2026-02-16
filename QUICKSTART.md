# QUICKSTART - Get PlanMyDate AI Running in 5 Minutes

## Step 1: Configure Environment (1 minute)

```bash
cd backend
```

Create a `.env` file with your credentials:

```env
MONGODB_URI=mongodb://localhost:27017/planmydate_ai
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=5000
NODE_ENV=development
```

**Need the keys?**
- **OpenAI API Key**: https://platform.openai.com/api-keys
- **MongoDB**: Local or https://www.mongodb.com/cloud/atlas

## Step 2: Start MongoDB (1 minute)

**Mac/Linux:**
```bash
mongod
```

**Windows:**
```bash
"C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe"
```

Or use MongoDB Atlas (cloud) - just update MONGODB_URI

## Step 3: Start Backend (1 minute)

```bash
cd backend
npm start
```

You should see:
```
✅ Server running on http://localhost:5000
✅ MongoDB connected successfully
```

## Step 4: Open Frontend (1 minute)

**Option A - Direct (Easiest):**
- Open `frontend/index.html` directly in your browser

**Option B - Local Server:**
```bash
cd frontend
python -m http.server 8000
# Open http://localhost:8000
```

## Step 5: Test It! (1 minute)

1. Click "Couple Mode" or "Solo Mode"
2. Fill in the form
3. Click "Generate Plan"
4. Watch the AI magic happen! ✨

---

## Troubleshooting

### Backend won't start
```
Error: MONGODB_URI not found
→ Add MONGODB_URI to .env file

Error: Invalid OpenAI API Key
→ Check your API key at https://platform.openai.com/api-keys
```

### Frontend won't connect
```
Error: Failed to generate plan
→ Check if backend is running on http://localhost:5000
→ Open DevTools (F12) and check Console for errors
```

### MongoDB connection refused
```
→ Is MongoDB running? (mongod)
→ Is it on the right port? (default 27017)
→ Try MongoDB Atlas cloud version instead
```

---

## What's Included

✅ **Backend (Express + Mongoose)**
- AI integration with OpenAI
- MongoDB data storage
- RESTful API endpoints
- Smart vibe matching algorithm

✅ **Frontend (Vanilla JavaScript)**
- Couple date planner
- Solo mode with vibe matching
- Beautiful responsive UI
- Real-time API communication

✅ **Features**
- Couple Date Planning
- Solo Date Planning
- Anonymous Vibe Matching
- Detailed results with actionable advice

---

## Key Endpoints to Test

```bash
# Health check
curl http://localhost:5000/api/health

# Generate date plan
curl -X POST http://localhost:5000/api/date-planner \
  -H "Content-Type: application/json" \
  -d '{
    "city": "NYC",
    "budget": 100,
    "dateType": "romantic",
    "partnerPersonality": "foodie"
  }'
```

---

## Next Steps

1. **Understand the code**: Read the comments in the source files
2. **Modify AI prompts**: Edit `backend/utils/prompts.js`
3. **Customize UI**: Edit `frontend/css/style.css`
4. **Add features**: Create new endpoints in `backend/routes/`

---

## Production Checklist

- [ ] Add authentication (JWT)
- [ ] Implement rate limiting
- [ ] Set CORS properly
- [ ] Add input sanitization
- [ ] Enable HTTPS
- [ ] Set up logging
- [ ] Add error monitoring
- [ ] Cache AI responses
- [ ] Add database backups

---

**Need Help?** Check out:
- [Setup Guide](docs/SETUP.md) - Detailed setup instructions
- [API Docs](docs/API_DOCUMENTATION.md) - Complete API reference
- Backend console logs - Check what's happening
- Browser DevTools (F12) - Check frontend errors

**Have fun building! 🚀**
