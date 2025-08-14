# PetVet - Mobile App for Pet Owners

A React Native mobile application designed specifically for pet owners to manage their pets' healthcare, connect with veterinarians, and provide emergency access to critical pet information through QR code technology.

## 🐾 Project Overview

**PetVet** is a React Native mobile app that empowers pet owners with:
- **Pet Profile Management**: Create detailed profiles with photos and health information
- **QR Code Emergency Access**: Generate unique QR codes for instant pet identification
- **Veterinarian Discovery**: Find and connect with local veterinary professionals
- **Appointment Booking**: Schedule and manage vet appointments seamlessly
- **Health Tracking**: Access medical records, vaccination schedules, and health reminders
- **Emergency Features**: Quick access to emergency vet contacts and critical pet info

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Install iOS dependencies (macOS only):
```bash
cd ios && pod install && cd ..
```

3. Start the Metro bundler:
```bash
npm start
```

4. Run the app:
```bash
# For iOS
npm run ios

# For Android
npm run android
```

## 📱 Current Development Status

**Phase 1 (MVP) - In Progress**

- ✅ Project initialization
- 🔄 Authentication system
- 🔄 Pet profile management
- 🔄 QR code generation
- 🔄 Veterinarian discovery
- 🔄 Appointment booking
- 🔄 Emergency features

## 🏗️ Technology Stack

- **Framework**: React Native 0.74.5
- **Navigation**: React Navigation 6
- **State Management**: Redux Toolkit + RTK Query
- **UI Components**: Native Base
- **Authentication**: AsyncStorage + Secure Store
- **Camera/QR**: react-native-camera
- **Maps**: react-native-maps (Google Maps)
- **Push Notifications**: Firebase Cloud Messaging

## 📋 Documentation

For detailed documentation, see the [`docs/`](./docs) directory:

- [Project Overview](./docs/requirements/project-overview.md)
- [App Requirements](./docs/requirements/pet-owner-app.md)
- [API Specifications](./docs/requirements/api-specifications.md)
- [Development Phases](./docs/phases/)
- [Design Guidelines](./docs/branding/)

## 🔧 Scripts

- `npm start` - Start Metro bundler
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## 📄 License

This project is proprietary. All rights reserved.

---

*Connecting pets with better healthcare through technology* 🐾