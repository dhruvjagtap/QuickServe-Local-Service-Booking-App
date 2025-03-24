import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

interface TopBarProps {
  title: string;                    // Dynamic title
  onBackPress?: () => void;         // Back navigation handler (optional)
}

const TopBar: React.FC<TopBarProps> = ({ title, onBackPress }) => {
  return (
    <View style={styles.container}>
      {/* Back or Menu Icon */}
      <TouchableOpacity onPress={onBackPress}>
        <Image source={require('../assets/stack.png')} style={styles.menuIcon} />
      </TouchableOpacity>

      {/* Dynamic Title */}
      <Text style={styles.font}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: '#34718F',
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: '100%',
    paddingLeft: 20,
  },
  menuIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  font: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default TopBar;
