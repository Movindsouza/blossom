# 🌱 Blossom - Plant Care App

Your first plant care companion - AI-powered plant recommendations and care guide for beginners.

**Monorepo Structure:**
- Frontend: React Native/Expo mobile app
- Backend: Express.js server for Claude AI integration

## Features

### 🌿 Smart Plant Recommendations
Get personalized plant recommendations based on:
- Your experience level (Beginner, Intermediate, Advanced)
- Available light conditions
- Watering capability
- Available space
- Pets and safety concerns

### 📚 Expert Care Tips
- Get detailed care instructions for any plant
- Learn about watering, light, humidity, and temperature
- Discover solutions to common plant problems
- Get propagation tips

### ❓ AI-Powered Q&A
- Ask any plant care questions
- Get expert advice powered by Claude AI
- Learn about plant identification
- Troubleshoot plant issues

### 🏡 Plant Collection Management
- Keep track of your plant collection
- Set watering reminders
- Log plant care activities
- Monitor plant growth

## Tech Stack

### Frontend
- **React Native** - Cross-platform mobile development
- **Expo** - Simplified React Native development
- **TypeScript** - Type-safe development
- **React Hooks** - State management

### Backend
- **Express.js** - Web API server
- **Claude AI (Anthropic)** - Intelligent recommendations
- **Axios** - HTTP client
- **Node.js/npm** - Runtime and package management

### Infrastructure
- **CORS** - Cross-origin request handling
- **Environment Variables** - Secure configuration
- **dotenv** - Configuration management

## Project Structure

```
blossom/
├── frontend/                  (React Native mobile app)
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── screens/           # App screens
│   │   ├── services/          # Frontend services
│   │   ├── types/             # TypeScript definitions
│   │   ├── utils/             # Utility functions
│   │   └── config/            # Frontend config
│   ├── App.tsx
│   ├── app.json
│   └── package.json
│
├── backend/                   (Express.js API server)
│   ├── routes/                # API endpoints
│   │   ├── recommendations.js
│   │   ├── care.js
│   │   ├── faq.js
│   │   └── identify.js
│   ├── utils/
│   │   └── claudeService.js   # Claude API client
│   ├── server.js              # Main server
│   ├── .env                   # Backend env (API key)
│   └── package.json
│
└── README.md                  # This file
```

## Prerequisites

- Node.js v20 or higher
- npm v11 or higher
- Claude API Key from [Anthropic](https://console.anthropic.com)

## Installation & Setup

### 1. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Install Expo CLI if needed
npm install -g expo-cli
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file with API key
cp .env.example .env
# Edit .env and add your CLAUDE_API_KEY
```

## Running the App

### Terminal 1: Start Backend Server

```bash
cd backend
npm start
```

You should see:
```
🌱 Blossom Backend Server Running
✅ Server: http://localhost:3000
```

### Terminal 2: Start Frontend

```bash
cd frontend
npm start
```

Then choose:
- Press `w` for **Web** (opens browser)
- Press `i` for **iOS** (requires Xcode)
- Press `a` for **Android** (requires Android Studio)

## API Endpoints

The frontend communicates with the backend at `http://localhost:3000/api/`:

- **POST** `/recommendations` - Get plant recommendations
- **POST** `/care` - Get care tips for a plant
- **POST** `/faq` - Answer plant questions
- **POST** `/identify` - Identify a plant
- **GET** `/health` - Server health check

See [backend/README.md](./backend/README.md) for detailed API documentation.

## Environment Variables

### Frontend (.env - already configured)
- `CLAUDE_API_KEY` - Used in frontend service (deprecated, use backend instead)

### Backend (.env - required)
```bash
CLAUDE_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxx
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:8081
```

## Development

### Code Style
- TypeScript for type safety
- Functional components with React Hooks
- Component-based architecture
- Modular service layer

### Adding New Features

**Frontend Screen:**
1. Create file in `frontend/src/screens/`
2. Add route to `App.tsx`
3. Import screen

**Backend Endpoint:**
1. Create file in `backend/routes/`
2. Add route in `backend/server.js`
3. Import and use `claudeService.js`

## Troubleshooting

### Backend won't start
```bash
# Check if port 3000 is in use
lsof -ti:3000 | xargs kill -9

# Try different port
PORT=3001 npm start
```

### Frontend can't connect to backend
- Ensure backend is running on `http://localhost:3000`
- Check CORS settings in `backend/server.js`
- Verify network connectivity

### Claude API errors
- Check API key is valid: https://console.anthropic.com
- Verify you have API credits
- Check rate limits

## Deployment

### Backend Deployment
- Deploy to Heroku, Vercel, Railway, or AWS
- Set environment variables in hosting platform
- Update `FRONTEND_URL` to match frontend domain

### Frontend Deployment
- Build: `expo build` or use Expo EAS
- Update `API_BASE_URL` in `src/services/claudeService.ts`
- Deploy to iOS App Store / Google Play

## Future Enhancements

- [ ] Plant identification from camera/photos
- [ ] Watering reminders and notifications
- [ ] Plant growth tracking with photos
- [ ] User authentication and accounts
- [ ] Plant swap and trading feature
- [ ] Offline mode support
- [ ] Dark mode theme
- [ ] Multiple language support
- [ ] Community plant database

## Security

- API keys stored in `.env` (never committed)
- Claude API key stays server-side only
- CORS configured for specific origins
- Input validation on all endpoints
- Error handling without exposing sensitive data

## Support & Resources

- [Anthropic Claude Docs](https://docs.anthropic.com)
- [Express.js Docs](https://expressjs.com)
- [React Native Docs](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)

## License

MIT

---

**Start your plant journey today! 🌿**

