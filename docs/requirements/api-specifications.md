# PetVet Mobile App - API Specifications

## Base URL
- Production: `https://api.petvet.app/v1`
- Staging: `https://staging-api.petvet.app/v1`

## Authentication Endpoints

### User Authentication
- `POST /auth/register` - Pet owner registration
- `POST /auth/login` - User login with email/password
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/logout` - User logout
- `POST /auth/verify-email` - Verify email address
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token

## Pet Management (Pet Owner Only)

### Pet Profiles
- `GET /pets` - Get user's pets list
- `POST /pets` - Create new pet profile
- `GET /pets/:id` - Get specific pet details
- `PUT /pets/:id` - Update pet information
- `DELETE /pets/:id` - Remove pet from account
- `POST /pets/:id/photos` - Upload pet photos
- `DELETE /pets/:id/photos/:photoId` - Delete pet photo

### QR Code Management
- `GET /pets/:id/qr-code` - Generate QR code for pet
- `PUT /pets/:id/qr-code/regenerate` - Regenerate QR code token
- `GET /qr/info/:qrToken` - Get public pet info from QR scan

## Veterinarian Discovery

### Vet Search & Profiles
- `GET /veterinarians` - Search vets with location/specialty filters
- `GET /veterinarians/:id` - Get veterinarian profile details
- `GET /veterinarians/:id/reviews` - Get vet reviews and ratings
- `GET /veterinarians/nearby` - Find nearest vets based on GPS location

## Appointment Management

### Booking System
- `GET /appointments` - Get user's appointments (past/upcoming)
- `POST /appointments` - Book new appointment
- `PUT /appointments/:id` - Reschedule appointment
- `DELETE /appointments/:id` - Cancel appointment
- `GET /veterinarians/:vetId/availability` - Check vet availability
- `POST /appointments/:id/rating` - Rate completed appointment

## Medical Records (Read-Only for Pet Owners)

### Health History
- `GET /pets/:id/medical-records` - Get pet's medical history
- `GET /pets/:id/vaccinations` - Get vaccination records
- `GET /pets/:id/prescriptions` - Get current/past prescriptions
- `GET /pets/:id/documents` - Get medical documents/certificates

## User Profile & Settings

### Account Management
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user information
- `PUT /user/password` - Change password
- `GET /user/settings` - Get app preferences
- `PUT /user/settings` - Update app settings
- `DELETE /user/account` - Delete account (with confirmation)

## Emergency Features

### Emergency Services
- `GET /emergency/vets` - Get nearest emergency vet clinics
- `POST /emergency/alert` - Send emergency alert with location
- `GET /pets/:id/emergency-info` - Get critical emergency info

## Notifications

### Push Notifications
- `POST /notifications/register-device` - Register device for push notifications
- `GET /notifications/history` - Get notification history
- `PUT /notifications/preferences` - Update notification preferences

## File Upload

### Media Management
- `POST /upload/image` - Upload pet images
- `POST /upload/document` - Upload medical documents
- `DELETE /files/:fileId` - Delete uploaded files