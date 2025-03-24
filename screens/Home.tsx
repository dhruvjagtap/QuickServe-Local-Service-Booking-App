import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

import TopBar from '../components/TopBar'; // Fixed path
import Search from '../components/Search';
import CategoryGrid from '../components/CategoryGrid'; // Fixed typo

const Home: React.FC = () => {
  const navigation = useNavigation(); // Access navigation object

  return (
    <View style={styles.container}>
      {/* Dynamic TopBar */}
      <TopBar title="Quick Serve" onBackPress={() => navigation.goBack()} />

      {/* Search Component */}
      <Search />

      {/* Category Grid */}
      <ScrollView>
        <CategoryGrid />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  font: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0e0e0e',
  },
});

export default Home;