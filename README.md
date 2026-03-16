# 🌱 Blossom - Plant Care App

Your first plant care companion - AI-powered plant recommendations and care guide for beginners.

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

### Backend & AI
- **Claude AI (Anthropic)** - Intelligent plant recommendations and advice
- **Axios** - HTTP client for API calls
- **Node.js/npm** - Package management

### Camera & Media
- **expo-camera** - Camera access for plant identification
- **expo-image-picker** - Photo library access

## Project Structure

```
blossom/
├── src/
│   ├── components/        # Reusable UI components
│   ├── screens/           # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── RecommendationScreen.tsx
│   │   ├── CareScreen.tsx
│   │   ├── FAQScreen.tsx
│   │   └── CollectionScreen.tsx
│   ├── services/          # API and business logic
│   │   └── claudeService.ts
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   │   └── helpers.ts
│   └── config/            # Configuration files
│       └── environment.ts
├── App.tsx                # Main app component
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## Prerequisites

- Node.js v20 or higher
- npm v11 or higher
- Expo CLI (will be installed via npm)
- Claude API Key from [Anthropic](https://console.anthropic.com)

## Installation

1. **Clone or navigate to the project**
   ```bash
   cd ~/blossom
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Claude API Key**
   - The API key is already configured in `src/config/environment.ts`
   - To update: Edit `src/config/environment.ts` and replace `CLAUDE_API_KEY`

4. **Install Expo CLI (if not already installed)**
   ```bash
   npm install -g expo-cli
   ```

## Running the App

### Start Development Server
```bash
npm start
```

### Run on iOS
```bash
npm run ios
```
Requirements: macOS with Xcode installed

### Run on Android
```bash
npm run android
```
Requirements: Android Studio and Android emulator/device

### Run on Web
```bash
npm run web
```

## Usage Guide

### 1. **Home Screen**
   - Browse available features
   - Quick navigation to all app sections
   - Learn about Blossom's features

### 2. **Get Plant Recommendations**
   - Answer 5 simple questions about your conditions
   - Receive AI-powered plant recommendations
   - Get detailed info about each recommendation

### 3. **Learn Plant Care**
   - Enter any plant name
   - Get comprehensive care instructions
   - Learn watering, light, and temperature requirements

### 4. **Ask Questions**
   - Ask any plant-related question
   - Get instant expert advice
   - Perfect for troubleshooting issues

### 5. **My Plant Collection**
   - Add plants to your personal collection
   - Track watering schedules
   - Monitor plant health and care history

## API Integration

### Claude AI Service
The app uses Claude AI for intelligent plant recommendations and advice.

**Key Methods:**
- `getPlantRecommendations(request)` - Get personalized plant recommendations
- `getCareTips(plantName)` - Get detailed care instructions
- `answerQuestion(question)` - Answer plant care questions
- `identifyPlant(description)` - Identify plants from descriptions

### Configuration
- **Model**: Claude 3.5 Sonnet
- **Timeout**: 30 seconds
- **Base URL**: https://api.anthropic.com/v1

## Environment Variables

Create or update `src/config/environment.ts`:

```typescript
export const CONFIG = {
  CLAUDE_API_KEY: 'your-api-key-here',
  CLAUDE_MODEL: 'claude-3-5-sonnet-20241022',
  API_TIMEOUT: 30000,
};
```

## Development

### Code Style
- TypeScript for type safety
- Functional components with React Hooks
- Component-based architecture
- Modular service layer

### Adding New Features

1. **Add New Screen**
   - Create file in `src/screens/`
   - Add route to App.tsx
   - Import screen in App.tsx

2. **Add New Service**
   - Create file in `src/services/`
   - Implement service class
   - Export singleton instance

3. **Add New Types**
   - Add to `src/types/index.ts`
   - Use in components and services

## Troubleshooting

### API Connection Issues
- Check Claude API key validity
- Verify network connection
- Check API rate limits

### Build Issues
```bash
# Clear cache
npm start -- --reset-cache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Platform-Specific Issues

**iOS:**
- Requires Xcode 14+
- May need pod install
- Check permissions in Info.plist

**Android:**
- Requires Android API level 21+
- Check SDK installation
- Update Gradle if needed

## Future Enhancements

- [ ] Plant identification from camera/photos
- [ ] Watering reminders and notifications
- [ ] Plant growth tracking with photos
- [ ] Community plant database
- [ ] Plant swap and trading feature
- [ ] Offline mode support
- [ ] Dark mode theme
- [ ] Multiple language support
- [ ] Export plant care history
- [ ] Social sharing features

## Security

- API keys are stored in environment configuration
- Never commit sensitive keys to version control
- Use environment variables for production
- Implement proper error handling

## Performance

- Optimized component rendering
- Efficient API calls with timeouts
- Cached responses where applicable
- Minimal bundle size

## License

This project is created for educational purposes.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review Claude API documentation
3. Check Expo documentation
4. File an issue with detailed description

## Credits

Built with ❤️ using:
- React Native & Expo
- Claude AI by Anthropic
- Community feedback and support

---

**Start your plant journey today! 🌿**
