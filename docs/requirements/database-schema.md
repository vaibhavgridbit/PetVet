# PetVet Mobile App - Database Schema

*Note: This schema represents the backend API database structure that the PetVet mobile app will interact with.*

## Pet Owners Table
```sql
CREATE TABLE pet_owners (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  profile_image_url VARCHAR(500),
  email_verified BOOLEAN DEFAULT FALSE,
  push_token VARCHAR(255), -- For notifications
  location_lat DECIMAL(10,8), -- For emergency features
  location_lng DECIMAL(11,8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Pets Table
```sql
CREATE TABLE pets (
  id UUID PRIMARY KEY,
  owner_id UUID REFERENCES pet_owners(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  species VARCHAR(50) NOT NULL,
  breed VARCHAR(100),
  date_of_birth DATE,
  gender ENUM('male', 'female', 'unknown'),
  weight DECIMAL(5,2),
  color VARCHAR(50),
  microchip_number VARCHAR(50),
  qr_token VARCHAR(255) UNIQUE NOT NULL,
  qr_token_expires_at TIMESTAMP,
  profile_image_url VARCHAR(500),
  emergency_contact_name VARCHAR(100),
  emergency_contact_phone VARCHAR(20),
  special_conditions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Pet Photos Table
```sql
CREATE TABLE pet_photos (
  id UUID PRIMARY KEY,
  pet_id UUID REFERENCES pets(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  caption VARCHAR(200),
  is_profile_photo BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Veterinarians Table (Read-Only for Mobile App)
```sql
CREATE TABLE veterinarians (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  license_number VARCHAR(100) UNIQUE NOT NULL,
  practice_name VARCHAR(200) NOT NULL,
  specialization VARCHAR(100),
  address TEXT NOT NULL,
  phone VARCHAR(20) NOT NULL,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  profile_image_url VARCHAR(500),
  bio TEXT,
  years_experience INTEGER,
  emergency_services BOOLEAN DEFAULT FALSE,
  average_rating DECIMAL(3,2) DEFAULT 0.00,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Appointments Table
```sql
CREATE TABLE appointments (
  id UUID PRIMARY KEY,
  pet_id UUID REFERENCES pets(id),
  owner_id UUID REFERENCES pet_owners(id),
  veterinarian_id UUID REFERENCES veterinarians(id),
  appointment_date TIMESTAMP NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  purpose VARCHAR(200),
  status ENUM('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show') DEFAULT 'scheduled',
  owner_notes TEXT,
  vet_notes TEXT,
  reminder_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Appointment Reviews Table
```sql
CREATE TABLE appointment_reviews (
  id UUID PRIMARY KEY,
  appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE,
  veterinarian_id UUID REFERENCES veterinarians(id),
  pet_owner_id UUID REFERENCES pet_owners(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Medical Records Table (Read-Only for Pet Owners)
```sql
CREATE TABLE medical_records (
  id UUID PRIMARY KEY,
  pet_id UUID REFERENCES pets(id),
  veterinarian_id UUID REFERENCES veterinarians(id),
  appointment_id UUID REFERENCES appointments(id),
  record_date TIMESTAMP NOT NULL,
  record_type ENUM('checkup', 'vaccination', 'treatment', 'surgery', 'emergency', 'other'),
  diagnosis TEXT,
  treatment TEXT,
  medications TEXT,
  follow_up_required BOOLEAN DEFAULT FALSE,
  follow_up_date DATE,
  attachments JSON, -- URLs to documents/images
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Vaccinations Table
```sql
CREATE TABLE vaccinations (
  id UUID PRIMARY KEY,
  pet_id UUID REFERENCES pets(id),
  medical_record_id UUID REFERENCES medical_records(id),
  vaccine_name VARCHAR(100) NOT NULL,
  vaccination_date DATE NOT NULL,
  next_due_date DATE,
  veterinarian_id UUID REFERENCES veterinarians(id),
  batch_number VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Notifications Table
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  pet_owner_id UUID REFERENCES pet_owners(id),
  type ENUM('appointment_reminder', 'vaccination_due', 'prescription_reminder', 'general'),
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  read_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Emergency Contacts Table
```sql
CREATE TABLE emergency_contacts (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  is_24_7 BOOLEAN DEFAULT FALSE,
  services TEXT, -- JSON array of services offered
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```