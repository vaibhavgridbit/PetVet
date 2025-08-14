import React from 'react';
import PlaceholderScreen from '../../components/ui/PlaceholderScreen';

const AppointmentListScreen: React.FC = () => {
  return (
    <PlaceholderScreen
      title="Appointments"
      subtitle="View your upcoming and past appointments, and book new visits with veterinarians."
      emoji="📅"
      showBackButton={false}
    />
  );
};

export default AppointmentListScreen;
