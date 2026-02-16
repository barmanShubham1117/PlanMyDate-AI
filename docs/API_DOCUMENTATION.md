# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Response Format

All API responses follow this format:

```json
{
  "success": true|false,
  "message": "Human readable message",
  "data": { /* response data */ }
}
```

---

## Endpoints

### Health Check

Check if API is online and working.

**Request:**
```
GET /health
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "PlanMyDate AI API is running",
  "timestamp": "2026-02-10T10:30:00.000Z"
}
```

---

## Date Planner Endpoints

### Generate Date Plan

Generate an AI-powered date plan for a couple.

**Request:**
```
POST /date-planner
Content-Type: application/json

{
  "city": "New York",
  "budget": 150,
  "dateType": "romantic",
  "partnerPersonality": "foodie"
}
```

**Parameters:**
| Parameter | Type | Required | Values |
|-----------|------|----------|--------|
| city | string | Yes | Any city name |
| budget | number | Yes | Positive integer (in USD) |
| dateType | string | Yes | romantic, fun, casual, adventure |
| partnerPersonality | string | Yes | introvert, foodie, filmy, nerd, gamer |

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Date plan generated successfully",
  "data": {
    "planId": "507f1f77bcf86cd799439011",
    "itinerary": "10:00 AM - Meet at Central Park...",
    "conversationStarters": [
      "What's your favorite travel memory?",
      "If you could have dinner with anyone..."
    ],
    "outfitSuggestions": "Smart casual with comfortable shoes...",
    "estimatedCost": "$120-150 including dinner and activities",
    "mistakesToAvoid": [
      "Avoid loud restaurants for romantic conversation",
      "Don't book activities too close together"
    ],
    "emergencyRescueLines": [
      "Tell me more about your photography hobby",
      "Have you been to this place before?"
    ]
  }
}
```

**Errors:**
- 400: Missing or invalid parameters
- 500: AI API error or server error

---

### Get Specific Date Plan

Retrieve a previously generated date plan by ID.

**Request:**
```
GET /date-planner/:planId
```

**Parameters:**
| Parameter | Type | Required |
|-----------|------|----------|
| planId | string | Yes (in URL) |

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Date plan retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userInput": {
      "city": "New York",
      "budget": 150,
      "dateType": "romantic",
      "partnerPersonality": "foodie"
    },
    "aiResponse": { /* as above */ },
    "createdAt": "2026-02-10T10:30:00.000Z"
  }
}
```

---

### Get Recent Date Plans

Get a list of recently generated date plans.

**Request:**
```
GET /date-planner?limit=10
```

**Query Parameters:**
| Parameter | Type | Default |
|-----------|------|---------|
| limit | number | 10 |

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Recent date plans retrieved successfully",
  "data": [ /* array of date plans */ ]
}
```

---

## Solo Mode Endpoints

### Generate Solo Plan with Vibe Matching

Generate a personalized solo date plan and check for vibe matches.

**Request:**
```
POST /solo-mode
Content-Type: application/json

{
  "city": "San Francisco",
  "interests": ["movies", "cafe hopping", "art"],
  "mood": "social",
  "preferredTime": "evening",
  "budget": 75,
  "personalityType": "foodie"
}
```

**Parameters:**
| Parameter | Type | Required | Values |
|-----------|------|----------|--------|
| city | string | Yes | Any city name |
| interests | array | Yes | movies, gaming, books, cafe hopping, fitness, art, music, travel, food, sports, nature, shopping |
| mood | string | Yes | relaxed, energetic, social, reflective |
| preferredTime | string | Yes | morning, evening, night |
| budget | number | Yes | Positive integer |
| personalityType | string | Yes | introvert, foodie, filmy, nerd, gamer |

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Solo plan generated with vibe match!",
  "data": {
    "soloPlan": {
      "soloActivities": "10:00 AM - Start at local cafe...",
      "confidenceBuilding": [
        "Attend a solo dine experience",
        "Join an art class"
      ],
      "placesToVisitAlone": [
        "Local indie bookstore",
        "Art gallery with quiet hours"
      ],
      "socialOpportunities": [
        "Attend community movie nights",
        "Join hobby clubs"
      ],
      "selfCareTips": [
        "Take time to reflect on your day",
        "Treat yourself to a favorite activity"
      ],
      "budgetBreakdown": "Cafe: $15, Activities: $40, Dinner: $20"
    },
    "vibeMatch": {
      "compatibilityMatch": "You both love art and prefer evening activities...",
      "suggestedLocation": "The local art museum café",
      "naturalScenario": "Both might meet at the same gallery opening...",
      "sharedActivity": "Attend an art exhibition together",
      "noPressureApproach": "Casual meetup, no expectations, just shared interests"
    },
    "hasMatch": true
  }
}
```

---

## Vibe Match Endpoints

### Create Vibe Profile

Create an anonymous vibe profile for future matching.

**Request:**
```
POST /vibe-match/profile
Content-Type: application/json

{
  "city": "Los Angeles",
  "interests": ["gaming", "movies", "music"],
  "mood": "energetic",
  "preferredTime": "night",
  "personalityType": "gamer",
  "budgetMin": 50,
  "budgetMax": 150
}
```

**Parameters:**
| Parameter | Type | Required |
|-----------|------|----------|
| city | string | Yes |
| interests | array | Yes |
| mood | string | Yes |
| preferredTime | string | Yes |
| personalityType | string | Yes |
| budgetMin | number | Yes |
| budgetMax | number | Yes |

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Vibe profile created successfully",
  "data": {
    "profileId": "507f1f77bcf86cd799439012",
    "message": "Anonymous profile created. Your vibe will help match others!"
  }
}
```

---

### Find Vibe Match

Find a compatible vibe profile based on user preferences.

**Request:**
```
POST /vibe-match/find
Content-Type: application/json

{
  "city": "Los Angeles",
  "interests": ["gaming", "movies"],
  "mood": "energetic",
  "preferredTime": "night",
  "budget": 100
}
```

**Response (200 OK - With Match):**
```json
{
  "success": true,
  "message": "Compatible vibe found!",
  "data": {
    "match": {
      "id": "507f1f77bcf86cd799439012",
      "city": "Los Angeles",
      "interests": ["gaming", "movies", "music"],
      "mood": "energetic",
      "preferredTime": "night"
    }
  }
}
```

**Response (200 OK - No Match):**
```json
{
  "success": true,
  "message": "No compatible vibe found in your city yet...",
  "data": {
    "match": null
  }
}
```

---

### Get Vibe Statistics

Get statistics about vibe profiles in a city.

**Request:**
```
GET /vibe-match/stats/:city
```

**Parameters:**
| Parameter | Type | Required |
|-----------|------|----------|
| city | string | Yes (in URL) |

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Vibe statistics retrieved",
  "data": {
    "city": "los angeles",
    "totalProfiles": 42,
    "moods": {
      "energetic": 15,
      "relaxed": 18,
      "social": 9
    },
    "interests": {
      "gaming": 22,
      "movies": 35,
      "music": 28
    },
    "preferredTimes": {
      "evening": 20,
      "night": 18,
      "morning": 4
    }
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Please fill in all fields",
  "statusCode": 400
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Date plan not found",
  "statusCode": 404
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Failed to generate date plan",
  "statusCode": 500
}
```

---

## Example Requests

### Using curl

```bash
# Generate date plan
curl -X POST http://localhost:5000/api/date-planner \
  -H "Content-Type: application/json" \
  -d '{
    "city": "Paris",
    "budget": 200,
    "dateType": "romantic",
    "partnerPersonality": "foodie"
  }'

# Generate solo plan
curl -X POST http://localhost:5000/api/solo-mode \
  -H "Content-Type: application/json" \
  -d '{
    "city": "Tokyo",
    "interests": ["art", "music"],
    "mood": "reflective",
    "preferredTime": "morning",
    "budget": 50,
    "personalityType": "nerd"
  }'

# Get stats
curl http://localhost:5000/api/vibe-match/stats/london
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. In production:
- Implement request rate limiting
- Add API key authentication
- Monitor OpenAI API usage

## Authentication

Currently, the API is open to all. For production:
- Add API key validation
- Implement JWT authentication
- Add CORS restrictions

---

**Last Updated**: February 2026
