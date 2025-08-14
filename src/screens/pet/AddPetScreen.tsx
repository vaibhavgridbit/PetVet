import React from 'react';
import PlaceholderScreen from '../../components/ui/PlaceholderScreen';

const AddPetScreen: React.FC = () => {
  return (
    <PlaceholderScreen
      title="Add New Pet"
      subtitle="Register a new pet with their basic information, photos, and emergency contacts."
      emoji="➕"
    />
  );
};

export default AddPetScreen;
