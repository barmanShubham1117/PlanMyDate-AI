# Rate Limiter

## Limits
- 15 requests/minute
- 1,500 requests/day

## Implementation
`backend/middleware/rateLimiter.js`
- In-memory storage
- Sliding window (60 seconds)
- Resets daily at midnight

## Response (429)
```json
{
  "success": false,
  "error": "Too many requests. Please wait before trying again.",
  "retryAfter": "45 seconds"
}
```

## Frontend Handling
```javascript
if (response.status === 429) {
  alert(`Rate limited! Retry after: ${result.retryAfter}`);
}
```

## Customize Limits
Edit `backend/config/ai-config.js`:
```javascript
rateLimits: {
  requestsPerMinute: 10,
  requestsPerDay: 1000
}
```

## Test
```bash
node backend/test-rate-limit.js
```

## Production
For production, use Redis or express-rate-limit package.
