import {Colors} from './colors';

// API Configuration
export const API_CONFIG = {
  BASE_URL: __DEV__
    ? 'http://localhost:3000/api/v1'
    : 'https://api.petvet.app/v1',
  TIMEOUT: 10000,
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@petvet_auth_token',
  USER_DATA: '@petvet_user_data',
  ONBOARDING_COMPLETED: '@petvet_onboarding_completed',
  BIOMETRIC_ENABLED: '@petvet_biometric_enabled',
} as const;

// Screen Dimensions
export const SCREEN = {
  PADDING: 16,
  MARGIN: 16,
  BORDER_RADIUS: 8,
  HEADER_HEIGHT: 56,
} as const;

// QR Code Configuration
export const QR_CONFIG = {
  SIZE: 200,
  ERROR_CORRECTION_LEVEL: 'H',
  BACKGROUND_COLOR: '#FFFFFF',
  FOREGROUND_COLOR: '#000000',
} as const;

// Pet Species Options
export const PET_SPECIES = [
  'Dog',
  'Cat',
  'Bird',
  'Fish',
  'Rabbit',
  'Guinea Pig',
  'Hamster',
  'Reptile',
  'Other',
] as const;

// Common Validation Rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
  PASSWORD_MIN_LENGTH: 8,
} as const;

export {Colors};
