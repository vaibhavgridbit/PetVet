import React from 'react';
import PlaceholderScreen from '../../components/ui/PlaceholderScreen';

const PetListScreen: React.FC = () => {
  return (
    <PlaceholderScreen
      title="My Pets"
      subtitle="Manage your pet profiles, view their QR codes, and access their health information."
      emoji="🐕"
      showBackButton={false}
    />
  );
};

export default PetListScreen;
