import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../store';
import {Colors} from '../constants';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const {user} = useAppSelector(state => state.auth);
  const {pets} = useAppSelector(state => state.pets);

  const quickActions = [
    {
      id: 'emergency',
      title: '🚨 Emergency',
      subtitle: 'Find emergency vets nearby',
      color: Colors.emergency,
      action: () => navigation.navigate('Emergency' as never),
    },
    {
      id: 'add_pet',
      title: '🐕 Add Pet',
      subtitle: 'Register a new pet',
      color: Colors.primary,
      action: () => navigation.navigate('Pets', {screen: 'AddPet'} as never),
    },
    {
      id: 'book_appointment',
      title: '📅 Book Appointment',
      subtitle: 'Schedule a vet visit',
      color: Colors.secondary,
      action: () =>
        navigation.navigate('Appointments', {screen: 'VetSearch'} as never),
    },
  ];

  const upcomingAppointments = []; // TODO: Get from appointments state

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hello, {user?.firstName || 'Pet Parent'}! 👋
        </Text>
        <Text style={styles.subtitle}>
          {pets.length === 0
            ? 'Welcome to PetVet! Add your first pet to get started.'
            : `You have ${pets.length} pet${
                pets.length === 1 ? '' : 's'
              } registered.`}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          {quickActions.map(action => (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionCard, {borderLeftColor: action.color}]}
              onPress={action.action}>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Pets</Text>
        {pets.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🐾</Text>
            <Text style={styles.emptyTitle}>No pets registered yet</Text>
            <Text style={styles.emptySubtitle}>
              Add your first pet to start managing their health records and
              appointments.
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() =>
                navigation.navigate('Pets', {screen: 'AddPet'} as never)
              }>
              <Text style={styles.primaryButtonText}>Add Your First Pet</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.petList}>
            {pets.slice(0, 3).map(pet => (
              <TouchableOpacity
                key={pet.id}
                style={styles.petCard}
                onPress={() =>
                  navigation.navigate('Pets', {
                    screen: 'PetDetail',
                    params: {petId: pet.id},
                  } as never)
                }>
                <Text style={styles.petEmoji}>
                  {pet.species === 'Dog'
                    ? '🐕'
                    : pet.species === 'Cat'
                    ? '🐱'
                    : pet.species === 'Bird'
                    ? '🦜'
                    : '🐾'}
                </Text>
                <View style={styles.petInfo}>
                  <Text style={styles.petName}>{pet.name}</Text>
                  <Text style={styles.petDetails}>
                    {pet.species}
                    {pet.breed ? ` • ${pet.breed}` : ''}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            {pets.length > 3 && (
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => navigation.navigate('Pets' as never)}>
                <Text style={styles.viewAllText}>
                  View all {pets.length} pets →
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        {upcomingAppointments.length === 0 ? (
          <View style={styles.emptyAppointments}>
            <Text style={styles.emptyIcon}>📅</Text>
            <Text style={styles.emptyTitle}>No upcoming appointments</Text>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() =>
                navigation.navigate('Appointments', {
                  screen: 'VetSearch',
                } as never)
              }>
              <Text style={styles.secondaryButtonText}>
                Book an Appointment
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {/* TODO: Display upcoming appointments */}
            <Text style={styles.placeholder}>
              Appointments will be displayed here
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.white,
    padding: 20,
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  section: {
    backgroundColor: Colors.white,
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  quickActions: {
    gap: 12,
  },
  actionCard: {
    backgroundColor: Colors.lightGray,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: Colors.lightGray,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  petList: {
    gap: 12,
  },
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    padding: 16,
    borderRadius: 8,
  },
  petEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  petDetails: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  viewAllButton: {
    padding: 12,
    alignItems: 'center',
  },
  viewAllText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyAppointments: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  placeholder: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default HomeScreen;
