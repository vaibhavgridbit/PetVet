import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {Colors} from '../constants';

const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🐾 PetVet</Text>
      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={styles.loader}
      />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  logo: {
    fontSize: 48,
    marginBottom: 40,
  },
  loader: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});

export default LoadingScreen;
