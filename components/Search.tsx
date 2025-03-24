import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

const Search = () => {
  const [searchText, setSearchText] = useState('');

  const handleMicPress = () => {
    console.log('Microphone Pressed!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        {/* Search Icon (Left) */}
        <Image source={require('../assets/search.png')} style={styles.searchIcon} />

        {/* Search Input */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
        />

        {/* Microphone Icon (Right) */}
        <TouchableOpacity onPress={handleMicPress}>
          <Image source={require('../assets/microphone.png')} style={styles.micIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    shadowOpacity: 0.2,
    alignItems: 'flex-start',
    margin: 10,
    marginHorizontal: 20,
    padding: 20,
  },

  searchWrapper: {
    flexDirection: 'row', // Align items in a horizontal row
    alignItems: 'center', // Vertically center items
    height: 40, // Match TextInput height
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingHorizontal: 15, // Internal padding for spacing
  },

  searchBar: {
    flex: 1, // Allow input to take remaining space
    fontSize: 15,
    color: '#8a817c',
    // paddingHorizontal:, // Avoid overlap with icons
  },

  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10, // Space between icon and input
    paddingLeft: 5
  },

  micIcon: {
    width: 20,
    height: 20,
    marginLeft: 10, // Space between input and mic icon
  },
});

export default Search;
