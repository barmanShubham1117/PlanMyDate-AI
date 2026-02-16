# PlanMyDate AI - Project Structure & Architecture

## Project Overview

**PlanMyDate AI** is a production-ready MERN stack application that leverages OpenAI to create personalized date plans and intelligently match users with compatible vibes based on their preferences.

---

## Complete Project Structure

```
PlanMyDate AI/
│
├── 📄 README.md              (Original project specification)
├── 📄 QUICKSTART.md          (5-minute setup guide)
├── 📄 .gitignore             (Git ignore file)
│
├── 📁 backend/
│   ├── 📁 config/
│   │   ├── env.js            (Environment variable manager)
│   │   ├── database.js       (MongoDB connection)
│   │   └── ai-config.js      (OpenAI configuration)
│   │
│   ├── 📁 models/
│   │   ├── DatePlan.js       (Couple date plan schema)
│   │   └── VibeProfile.js    (Anonymous vibe profile schema)
│   │
│   ├── 📁 controllers/
│   │   ├── datePlannerController.js  (Generate couple date plans)
│   │   ├── soloModeController.js     (Generate solo plans + matching)
│   │   └── vibeMatchController.js    (Vibe profile management)
│   │
│   ├── 📁 services/
│   │   ├── aiService.js      (OpenAI API integration)
│   │   ├── formatService.js  (Response formatting)
│   │   ├── matchingService.js (Vibe matching logic)
│   │   └── validationService.js (Input validation)
│   │
│   ├── 📁 routes/
│   │   ├── index.js          (Main router)
│   │   ├── datePlanner.js    (Couple mode routes)
│   │   ├── soloMode.js       (Solo mode routes)
│   │   └── vibeMatch.js      (Vibe matching routes)
│   │
│   ├── 📁 middleware/
│   │   ├── errorHandler.js   (Error handling middleware)
│   │   └── validators.js     (Request validation middleware)
│   │
│   ├── 📁 utils/
│   │   ├── prompts.js        (AI prompt templates)
│   │   └── helpers.js        (Utility functions)
│   │
│   ├── app.js                (Express app configuration)
│   ├── server.js             (Server entry point)
│   ├── .env.example          (Environment variables template)
│   ├── package.json          (Dependencies)
│   └── node_modules/         (Installed packages)
│
├── 📁 frontend/
│   ├── 📁 js/
│   │   ├── 📁 api/
│   │   │   └── client.js     (Backend API communication)
│   │   │
│   │   ├── 📁 pages/
│   │   │   ├── home.js       (Home page logic)
│   │   │   ├── datePlannerPage.js   (Couple mode page)
│   │   │   └── soloModePage.js      (Solo mode page)
│   │   │
│   │   ├── 📁 components/
│   │   │   ├── navbar.js     (Navigation bar component)
│   │   │   └── resultDisplay.js (Results display component)
│   │   │
│   │   └── app.js            (Main app logic & navigation)
│   │
│   ├── 📁 css/
│   │   ├── style.css         (Main stylesheet)
│   │   ├── responsive.css    (Mobile responsive styles)
│   │   └── components.css    (Reusable component styles)
│   │
│   ├── 📁 assets/
│   │   ├── 📁 images/
│   │   ├── 📁 icons/
│   │   └── favicon.ico
│   │
│   └── index.html            (Main HTML page)
│
└── 📁 docs/
    ├── SETUP.md              (Detailed setup guide)
    └── API_DOCUMENTATION.md  (Complete API reference)
```

---

## Backend Architecture

### Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose ODM
- **AI Integration**: OpenAI API (GPT-3.5 or GPT-4)
- **HTTP Client**: Axios
- **Utilities**: dotenv (env management), cors

### Design Patterns

#### 1. Route → Controller → Service Architecture
```
Request → Route → Controller → Service → Database
```

**Example Flow (Date Planner):**
1. User submits form → `POST /api/date-planner`
2. Route handler validates and passes to controller
3. Controller validates input → calls AI service
4. Service calls OpenAI API
5. Response formatted and saved to MongoDB
6. Formatted response sent to frontend

#### 2. Service Layer Separation
Each service handles a specific responsibility:

| Service | Responsibility |
|---------|-----------------|
| `aiService.js` | OpenAI API calls & prompt management |
| `formatService.js` | Parse AI responses into structured data |
| `matchingService.js` | Vibe profile matching algorithm |
| `validationService.js` | Input validation & error handling |

#### 3. Modular Configuration
All configuration centralized in `/config`:
- Database connection
- Environment variables
- AI model settings

### Database Schema

#### DatePlan Collection
```javascript
{
  userInput: {
    city: String,
    budget: Number,
    dateType: Enum,
    partnerPersonality: Enum
  },
  aiResponse: {
    itinerary: String,
    conversationStarters: [String],
    outfitSuggestions: String,
    estimatedCost: String,
    mistakesToAvoid: [String],
    emergencyRescueLines: [String]
  },
  timestamps
}
```

#### VibeProfile Collection
```javascript
{
  city: String (indexed),
  interests: [String],
  mood: Enum,
  budgetRange: { min, max },
  preferredTime: Enum,
  personalityType: Enum,
  expiresAt: Date (30 days auto-cleanup),
  timestamps,
  compound indexes for efficient matching
}
```

### Matching Algorithm

The vibe matching system uses a scoring mechanism:

```
Score Calculation:
- Common interests: +10 per interest (minimum 2 required)
- Budget overlap: +20
- Mood match: +15
- Time preference match: +15

Match threshold: Score >= 25
Returns highest-scoring match in same city
```

---

## Frontend Architecture

### Tech Stack
- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox
- **JavaScript**: Vanilla (No frameworks for simplicity)

### Component Structure

#### Pages
- **Home**: Feature overview, mode selection
- **Couple Mode**: Input form for couple date planning
- **Solo Mode**: Input form with vibe matching
- **Results**: Display formatted AI responses

#### Components
- **Navbar**: Navigation & API status indicator
- **ResultDisplay**: Format & display API responses
- **Form Handling**: Input validation & submission

#### API Client
Single point of contact with backend:
```javascript
// Generated from backend automatically
apiCall(endpoint, options)
generateDatePlan()
generateSoloPlan()
createVibeProfile()
findVibeMatch()
```

### Responsive Design
- **Desktop**: Full layout (1200px+)
- **Tablet**: Adjusted grid (768px-1199px)
- **Mobile**: Single column (480px-767px)
- **Small Mobile**: Optimized for tiny screens (<480px)

---

## API Endpoints

### Health & Status
- `GET /api/health` - API health check

### Date Planner
- `POST /api/date-planner` - Generate date plan
- `GET /api/date-planner/:planId` - Retrieve specific plan
- `GET /api/date-planner` - List recent plans

### Solo Mode
- `POST /api/solo-mode` - Generate solo plan + matching

### Vibe Match
- `POST /api/vibe-match/profile` - Create profile
- `POST /api/vibe-match/find` - Find match
- `GET /api/vibe-match/stats/:city` - City statistics

---

## Data Flow

### Couple Date Planning Flow
```
User Form
    ↓
Frontend Validation
    ↓
POST /api/date-planner
    ↓
Backend: Input Validation
    ↓
Call OpenAI API with Prompt
    ↓
Format AI Response
    ↓
Save to MongoDB
    ↓
Return Formatted Response
    ↓
Display Results on Frontend
```

### Solo Mode with Vibe Matching Flow
```
User Form
    ↓
Frontend Validation
    ↓
POST /api/solo-mode
    ↓
Backend: Generate Solo Plan
    ↓
Find Matching Vibe Profile
    ↓
If Match Found:
  - Generate Match Suggestion
  - Save User's Vibe Profile
    ↓
Return Solo Plan + Optional Match
    ↓
Display Results with Match Info (if applicable)
```

---

## Key Features Implementation

### 1. AI Prompt Engineering
**Location**: `backend/utils/prompts.js`

Prompts are structured to:
- Guide AI to structured output
- Use clear section headers
- Ensure consistent formatting
- Include context & constraints

**Example Structure**:
```
Create a date plan with:
- City: {city}
- Budget: ${budget}
- Type: {dateType}
- Partner: {personality}

Provide in EXACT format:
ITINERARY:
[content]

CONVERSATION STARTERS:
[content]
...
```

### 2. Smart Vibe Matching
**Location**: `backend/services/matchingService.js`

Matching considers:
- Geographic proximity (same city required)
- Interest compatibility (≥2 common)
- Budget overlap
- Mood preferences
- Time availability

Never exposes personal data.

### 3. Response Formatting
**Location**: `backend/services/formatService.js`

Parses AI text response into:
- Section headers detection
- List extraction
- Structured JSON output
- Frontend-ready format

### 4. Input Validation
**Location**: `backend/services/validationService.js`

Validates:
- Required fields
- Enum values
- Budget constraints
- Array contents
- Type safety

---

## Error Handling

### Backend Error Management
1. **Validation Errors** (400): Invalid input
2. **Not Found Errors** (404): Missing data
3. **Server Errors** (500): API failures

### Frontend Error Display
- Toast notifications
- Error messages with timeout
- Graceful error recovery
- Console logging for debugging

---

## Security Considerations

### Implemented ✅
- Input validation on all endpoints
- CORS headers configured
- Environment variables for secrets
- No hardcoded API keys

### Production Recommendations
- [ ] Add authentication (JWT)
- [ ] Implement rate limiting
- [ ] Restrict CORS origins
- [ ] Add request logging
- [ ] Use HTTPS/TLS
- [ ] Sanitize all inputs
- [ ] Add API versioning
- [ ] Implement caching

---

## Performance Optimizations

### Database
- Compound indexes for vibe matching
- TTL (Time To Live) for profile cleanup
- Query optimization for common searches

### API
- Efficient prompt design
- Response caching opportunity
- Minimal payload sizes

### Frontend
- Lazy loading of components
- CSS optimization
- Minimal JavaScript bundle

---

## Scalability Considerations

### Current Limitations
- Synchronous AI processing (waits for response)
- No caching of responses
- No rate limiting
- Single server deployment

### For Production Scaling
- Job queue for AI processing
- Redis caching layer
- Rate limiting service
- Load balancer
- Database replication
- CDN for static assets

---

## Development Workflow

### Adding New Features

1. **Backend**:
   - Add route in `routes/`
   - Create controller in `controllers/`
   - Add business logic in `services/`
   - Update `routes/index.js`

2. **Frontend**:
   - Add page/component files
   - Add API method in `js/api/client.js`
   - Update `index.html` if needed
   - Style with CSS

3. **Testing**:
   - Test API with curl/Postman
   - Test frontend form submission
   - Check browser console

---

## Dependencies

### Backend
```json
{
  "express": "^5.2.1",      // Web framework
  "mongoose": "^9.1.6",     // MongoDB ODM
  "cors": "^2.8.6",         // Cross-origin requests
  "dotenv": "^17.2.4",      // Environment variables
  "axios": "^1.13.5"        // HTTP client
}
```

### Frontend
- None! Pure vanilla JavaScript

---

## Learning Resources

This project teaches:
- ✅ Express.js server architecture
- ✅ MongoDB schema design
- ✅ REST API design patterns
- ✅ Async/await & error handling
- ✅ Environment configuration
- ✅ Frontend-backend integration
- ✅ Responsive web design
- ✅ API integration (OpenAI)
- ✅ Data validation & sanitization
- ✅ Modular code organization

---

## Future Enhancement Ideas

1. **User Accounts**
   - Save favorite plans
   - History tracking
   - Preferences

2. **Advanced Matching**
   - Machine learning for better matches
   - User ratings/feedback
   - Trending interests

3. **Mobile App**
   - React Native version
   - Push notifications
   - Offline mode

4. **Social Features**
   - User profiles
   - Plan sharing
   - Comments/reviews

5. **Analytics**
   - Popular date types
   - City trends
   - User demographics

---

## Deployment Guide

### Heroku (Backend)
```bash
heroku create your-app-name
git push heroku main
heroku config:set OPENAI_API_KEY=your_key
heroku config:set MONGODB_URI=your_uri
```

### Vercel (Frontend)
```bash
vercel deploy
```

### Self-Hosted
- Use Docker
- Deploy to AWS EC2
- Use nginx reverse proxy
- Enable SSL/TLS

---

## File Statistics

| Category | Count |
|----------|-------|
| Backend Files | 20 |
| Frontend Files | 10 |
| Configuration | 3 |
| Documentation | 3 |
| Styles | 3 |
| **Total** | **42** |

---

## Project Summary

**PlanMyDate AI** is a fully functional, production-ready application that demonstrates:
- Modern full-stack development
- AI API integration
- Database design & optimization
- Responsive UI/UX
- Clean code architecture
- Comprehensive documentation

Perfect for learning and teaching modern web development! 🚀

---

**Made with ❤️ for Education**
*Last Updated: February 2026*
