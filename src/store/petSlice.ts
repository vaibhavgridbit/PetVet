import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {Pet} from '../types';

interface PetState {
  pets: Pet[];
  currentPet: Pet | null;
  isLoading: boolean;
  error: string | null;
}

// Mock API calls - replace with actual implementation
export const fetchPets = createAsyncThunk(
  'pets/fetchPets',
  async (_, {rejectWithValue}) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/pets');

      if (!response.ok) {
        throw new Error('Failed to fetch pets');
      }

      const data = await response.json();
      return data.pets;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch pets',
      );
    }
  },
);

export const createPet = createAsyncThunk(
  'pets/createPet',
  async (
    petData: Omit<Pet, 'id' | 'createdAt' | 'updatedAt' | 'qrToken'>,
    {rejectWithValue},
  ) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
      });

      if (!response.ok) {
        throw new Error('Failed to create pet');
      }

      const data = await response.json();
      return data.pet;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to create pet',
      );
    }
  },
);

export const updatePet = createAsyncThunk(
  'pets/updatePet',
  async ({id, ...petData}: Partial<Pet> & {id: string}, {rejectWithValue}) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/pets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
      });

      if (!response.ok) {
        throw new Error('Failed to update pet');
      }

      const data = await response.json();
      return data.pet;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update pet',
      );
    }
  },
);

export const deletePet = createAsyncThunk(
  'pets/deletePet',
  async (petId: string, {rejectWithValue}) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/pets/${petId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete pet');
      }

      return petId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to delete pet',
      );
    }
  },
);

const initialState: PetState = {
  pets: [],
  currentPet: null,
  isLoading: false,
  error: null,
};

const petSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    setCurrentPet: (state, action: PayloadAction<Pet | null>) => {
      state.currentPet = action.payload;
    },
    clearPetError: state => {
      state.error = null;
    },
    addPetPhoto: (
      state,
      action: PayloadAction<{petId: string; photoUrl: string}>,
    ) => {
      const pet = state.pets.find(p => p.id === action.payload.petId);
      if (pet) {
        pet.profileImageUrl = action.payload.photoUrl;
      }
    },
  },
  extraReducers: builder => {
    builder
      // Fetch pets
      .addCase(fetchPets.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pets = action.payload;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create pet
      .addCase(createPet.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pets.push(action.payload);
      })
      .addCase(createPet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update pet
      .addCase(updatePet.fulfilled, (state, action) => {
        const index = state.pets.findIndex(pet => pet.id === action.payload.id);
        if (index !== -1) {
          state.pets[index] = action.payload;
        }
      })
      // Delete pet
      .addCase(deletePet.fulfilled, (state, action) => {
        state.pets = state.pets.filter(pet => pet.id !== action.payload);
      });
  },
});

export const {setCurrentPet, clearPetError, addPetPhoto} = petSlice.actions;
export default petSlice.reducer;
