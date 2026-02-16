# Gemini AI Setup

## Quick Setup (3 Steps)

### 1. Get API Key
- Visit: https://makersuite.google.com/app/apikey
- Sign in and create API key

### 2. Update .env
```env
GEMINI_API_KEY=your_api_key_here
```

### 3. Install & Start
```bash
cd backend
npm install
npm start
```

## Rate Limits (Auto-enforced)
- 15 requests/minute
- 1,500 requests/day

## Test
```bash
curl -X POST http://localhost:5000/api/date-planner \
  -H "Content-Type: application/json" \
  -d '{"city":"Mumbai","budget":2000,"dateType":"romantic","partnerPersonality":"foodie"}'
```

## Troubleshooting
- **401/403 Error**: Check API key in `.env`
- **429 Error**: Rate limited, wait 60 seconds
- **Server won't start**: Verify MongoDB is running
