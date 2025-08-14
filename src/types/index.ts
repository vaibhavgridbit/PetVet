// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Pet types
export interface Pet {
  id: string;
  name: string;
  species: string;
  breed?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'unknown';
  weight?: number;
  color?: string;
  microchipNumber?: string;
  qrToken: string;
  profileImageUrl?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  specialConditions?: string;
  createdAt: string;
  updatedAt: string;
}

// Veterinarian types
export interface Veterinarian {
  id: string;
  firstName: string;
  lastName: string;
  practiceName: string;
  specialization?: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  profileImageUrl?: string;
  bio?: string;
  yearsExperience?: number;
  emergencyServices: boolean;
  averageRating: number;
  totalReviews: number;
}

// Appointment types
export interface Appointment {
  id: string;
  petId: string;
  veterinianId: string;
  appointmentDate: string;
  duration: number;
  purpose: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  ownerNotes?: string;
  vetNotes?: string;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
