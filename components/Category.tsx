import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface CategoryProps {
  name: string;
  icon: any; // Accepts image imports
  onPress: () => void; // Function to handle click
}

const Category: React.FC<CategoryProps> = ({ name, icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.font}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: 120,
    backgroundColor: '#34718F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    margin: 5,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  font: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Category;
