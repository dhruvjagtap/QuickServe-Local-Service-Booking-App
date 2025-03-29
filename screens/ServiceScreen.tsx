import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from '../components/TopBar';
import ProvidersGrid from '../components/ProvidersGrid';

const ServiceScreen = ({ route, navigation }: any) => {
  const { serviceName } = route.params;

  return (
    <View style={styles.container}>
      <TopBar title={serviceName} onBackPress={() => navigation.goBack()} />
      <ProvidersGrid filter={serviceName} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ServiceScreen;
