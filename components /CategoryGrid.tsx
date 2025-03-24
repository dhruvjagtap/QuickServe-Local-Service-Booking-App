import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Category from '../components/Category';
import categoriesData from '../data/category.json';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 1. Define the navigation type
type RootStackParamList = {
  Home: undefined;
  ServiceScreen: { serviceName: string };
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// Dynamically map image paths
const imageMap: Record<string, any> = {
  'painter.png': require('../assets/painter.png'),
  'plumber.png': require('../assets/plumber.png'),
  'electrician.png': require('../assets/electrician.png'),
  'tutor.png': require('../assets/tutor.png'),
  'carpenter.png': require('../assets/carpenter.png'),
  'maid.png': require('../assets/maid.png'),
  'mechanic.png': require('../assets/mechanic.png'),
  'beautician.png': require('../assets/beautician.png'),
  'cook.png': require('../assets/cook.png'),
  'driver.png': require('../assets/driver.png'),
  'ac-repair.png': require('../assets/ac-repair.png'),
  'home-cleaning.png': require('../assets/home-cleaning.png'),
  'laundry.png': require('../assets/laundry.png'),
  'babysitter.png': require('../assets/babysitter.png'),
  'gardener.png': require('../assets/gardener.png'),
  'others.png': require('../assets/others.png'),
};

const getImage = (icon: string | undefined) => {
  return icon && imageMap[icon] ? imageMap[icon] : imageMap['others.png'];
};

const CategoryGrid: React.FC = () => {
  // 2. Use typed navigation
  const navigation = useNavigation<NavigationProps>();

  const categories = categoriesData.map((item) => ({
    ...item,
    icon: getImage(item.icon),
  }));

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Category
            name={item.name}
            icon={item.icon}
            onPress={() => navigation.navigate('ServiceScreen', { serviceName: item.name })}
          />
        )}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default CategoryGrid;
