import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from '../types/navigation';
import {Colors} from '../constants';

// Import tab screens
import HomeScreen from '../screens/HomeScreen';
import PetNavigator from './PetNavigator';
import AppointmentNavigator from './AppointmentNavigator';
import EmergencyScreen from '../screens/emergency/EmergencyScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

// Icons - using simple text for now, can be replaced with vector icons later
const TabIcon: React.FC<{name: string; focused: boolean}> = ({
  name,
  focused,
}) => <>{name}</>;

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => (
          <TabIcon name={getTabIconName(route.name)} focused={focused} />
        ),
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.calm,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
        },
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="Pets"
        component={PetNavigator}
        options={{
          title: 'My Pets',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentNavigator}
        options={{
          title: 'Appointments',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Emergency"
        component={EmergencyScreen}
        options={{
          title: 'Emergency',
          tabBarLabelStyle: {color: Colors.emergency},
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const getTabIconName = (routeName: keyof MainTabParamList): string => {
  switch (routeName) {
    case 'Home':
      return '🏠';
    case 'Pets':
      return '🐕';
    case 'Appointments':
      return '📅';
    case 'Emergency':
      return '🚨';
    case 'Profile':
      return '👤';
    default:
      return '•';
  }
};

export default MainNavigator;
