import React from 'react';
import PlaceholderScreen from '../../components/ui/PlaceholderScreen';

const EmergencyScreen: React.FC = () => {
  return (
    <PlaceholderScreen
      title="Emergency"
      subtitle="Find emergency veterinary clinics nearby and access critical pet information quickly."
      emoji="🚨"
      showBackButton={false}
    />
  );
};

export default EmergencyScreen;
