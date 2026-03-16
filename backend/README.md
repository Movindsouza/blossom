# Blossom Backend API

Backend server for Blossom plant care app. Handles secure Claude AI API requests and serves endpoints to the React Native frontend.

## Quick Start

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and add your Claude API key:

```bash
cp .env.example .env
```

Edit `.env`:

```
CLAUDE_API_KEY=your-api-key-here
PORT=3000
NODE_ENV=development
```

### Start Development Server

```bash
npm start
```

Or with auto-reload:

```bash
npm run dev
```

The server will start at: **http://localhost:3000**

Health check: **http://localhost:3000/health**

---

## API Endpoints

### 1. Get Plant Recommendations

**POST** `/api/recommendations`

Get personalized plant recommendations based on user conditions.

**Request:**

```json
{
  "experience": "beginner",
  "light": "medium",
  "wateringCapability": "weekly",
  "space": "small",
  "pets": false,
  "budget": 50
}
```

**Response:**

```json
{
  "success": true,
  "message": "Plant recommendations retrieved successfully",
  "data": {
    "recommendations": "Recommended plants are...",
  }
}
```

### 2. Get Care Tips

**POST** `/api/care`

Get detailed care instructions for a specific plant.

**Request:**

```json
{
  "plantName": "Monstera"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Care tips retrieved successfully",
  "data": {
    "plant": "Monstera",
    "careTips": "Care instructions for Monstera..."
  }
}
```

### 3. Answer Questions

**POST** `/api/faq`

Answer plant-related questions.

**Request:**

```json
{
  "question": "Why are my plant leaves turning yellow?"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Question answered successfully",
  "data": {
    "question": "Why are my plant leaves turning yellow?",
    "answer": "Yellow leaves can indicate..."
  }
}
```

### 4. Identify Plant

**POST** `/api/identify`

Identify a plant from a description.

**Request:**

```json
{
  "description": "Green leaves with white stripes, grows tall"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Plant identified successfully",
  "data": {
    "identification": "This plant is likely a Monstera deliciosa..."
  }
}
```

---

## Project Structure

```
backend/
├── routes/              # API endpoints
│   ├── recommendations.js
│   ├── care.js
│   ├── faq.js
│   └── identify.js
├── utils/               # Services and helpers
│   └── claudeService.js
├── middleware/          # Express middleware
├── server.js            # Main server file
├── package.json
├── .env                 # Environment variables (add your API key)
├── .env.example         # Example env template
└── README.md            # This file
```

---

## Technologies

- **Express.js** - Web framework
- **@anthropic-ai/sdk** - Claude AI client
- **Axios** - HTTP client
- **dotenv** - Environment configuration
- **CORS** - Cross-origin resource sharing

---

## Development

### Enable Auto-Reload

```bash
npm run dev
```

This uses **nodemon** to automatically restart the server when files change.

### Logging

The server includes detailed logging:
- `📤` Incoming requests
- `✅` Successful API calls
- `❌` Error messages

Check the terminal for debugging information.

---

## Security Best Practices

1. **Never commit `.env` file** - Keep API keys private
2. **Use environment variables** - Load from `.env`, not in code
3. **CORS configured** - Allows frontend origin only
4. **API key in header** - Claude API key stays server-side only
5. **Input validation** - All endpoints validate request data

---

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm start
```

### Claude API Errors

- Check API key is valid: https://console.anthropic.com
- Verify network connection
- Check rate limits

### CORS Errors

- Ensure frontend URL is correct in CORS config
- Check `FRONTEND_URL` in `.env`

---

## API Rate Limits

Claude API has rate limits depending on your plan. Check [Anthropic Dashboard](https://console.anthropic.com) for details.

---

## Future Enhancements

- [ ] Database for user plant collections
- [ ] Image upload for plant identification
- [ ] Watering reminder notifications
- [ ] Plant care history logging
- [ ] Multi-language support

---

## Support

For issues or questions:
1. Check error logs in terminal
2. Verify Claude API key is valid
3. Check backend is running: `curl http://localhost:3000/health`
4. Review request/response in API documentation

---

Made with ❤️ for plant lovers 🌱
