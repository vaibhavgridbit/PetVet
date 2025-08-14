import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PetStackParamList} from '../types/navigation';
import {Colors} from '../constants';

// Import pet screens
import PetListScreen from '../screens/pet/PetListScreen';
import PetDetailScreen from '../screens/pet/PetDetailScreen';
import AddPetScreen from '../screens/pet/AddPetScreen';
import EditPetScreen from '../screens/pet/EditPetScreen';
import PetQRCodeScreen from '../screens/pet/PetQRCodeScreen';

const Stack = createStackNavigator<PetStackParamList>();

const PetNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="PetList"
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
        name="PetList"
        component={PetListScreen}
        options={{
          title: 'My Pets',
        }}
      />
      <Stack.Screen
        name="PetDetail"
        component={PetDetailScreen}
        options={({route}) => ({
          title: 'Pet Details',
        })}
      />
      <Stack.Screen
        name="AddPet"
        component={AddPetScreen}
        options={{
          title: 'Add New Pet',
        }}
      />
      <Stack.Screen
        name="EditPet"
        component={EditPetScreen}
        options={{
          title: 'Edit Pet',
        }}
      />
      <Stack.Screen
        name="PetQRCode"
        component={PetQRCodeScreen}
        options={({route}) => ({
          title: 'Pet QR Code',
        })}
      />
    </Stack.Navigator>
  );
};

export default PetNavigator;
