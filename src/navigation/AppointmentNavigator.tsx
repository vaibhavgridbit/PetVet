import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppointmentStackParamList} from '../types/navigation';
import {Colors} from '../constants';

// Import appointment screens
import AppointmentListScreen from '../screens/appointment/AppointmentListScreen';
import BookAppointmentScreen from '../screens/appointment/BookAppointmentScreen';
import AppointmentDetailScreen from '../screens/appointment/AppointmentDetailScreen';
import VetSearchScreen from '../screens/appointment/VetSearchScreen';
import VetDetailScreen from '../screens/appointment/VetDetailScreen';

const Stack = createStackNavigator<AppointmentStackParamList>();

const AppointmentNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="AppointmentList"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="AppointmentList"
        component={AppointmentListScreen}
        options={{
          title: 'Appointments',
        }}
      />
      <Stack.Screen
        name="BookAppointment"
        component={BookAppointmentScreen}
        options={{
          title: 'Book Appointment',
        }}
      />
      <Stack.Screen
        name="AppointmentDetail"
        component={AppointmentDetailScreen}
        options={{
          title: 'Appointment Details',
        }}
      />
      <Stack.Screen
        name="VetSearch"
        component={VetSearchScreen}
        options={{
          title: 'Find Veterinarian',
        }}
      />
      <Stack.Screen
        name="VetDetail"
        component={VetDetailScreen}
        options={{
          title: 'Veterinarian Details',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppointmentNavigator;
