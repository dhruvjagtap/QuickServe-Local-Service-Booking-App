import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopBar from '../components/TopBar';

const ServiceScreen = ({ route, navigation }: any) => {
  const { serviceName } = route.params;

  return (
    <View style={styles.container}>
      <TopBar title={serviceName} onBackPress={() => navigation.goBack()} />
      <Text style={styles.infoText}>Welcome to {serviceName} Service!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  infoText: {
    fontSize: 24,
    marginTop: 20,
  },
});

export default ServiceScreen;
