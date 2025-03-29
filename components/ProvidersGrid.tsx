import React, { useCallback } from 'react';
import { Text, View, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ProviderCard from './ProviderCard';
import providers from '../data/updated_service_providers_with_images.json';

// Define the type for the provider
interface Provider {
  id: number;
  name: string;
  profession: string; // This will be used for filtering
  image_url: string;
  rating: number;
  fees: number;
  experience_years: number;
  location: string;
  reviews: { customer_name: string; comment: string; rating: number }[];
}

export type RootStackParamList = {
  ProvidersGrid: undefined;
  ProviderProfile: { provider: Provider };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'ProvidersGrid'>;

// Accept a 'filter' prop to filter the list of providers
interface ProvidersGridProps {
  filter: string;
}

const ProvidersGrid: React.FC<ProvidersGridProps> = ({ filter }) => {
  const navigation = useNavigation<NavigationProp>();

  // Filter providers based on the service (profession) name
  const filteredProviders = providers.filter((provider) =>
    provider.profession.toLowerCase().includes(filter.toLowerCase())
  );

  // Handle provider selection and navigate to ProviderProfile
  const handleProviderPress = (provider: Provider) => {
    navigation.navigate('ProviderProfile', { provider });
  };

  // Define the render function for ProviderCard
  const renderProviderCard: ListRenderItem<Provider> = useCallback(
    ({ item }) => (
      <ProviderCard
        name={item.name}
        image_url={item.image_url}
        rating={item.rating}
        onPress={() => handleProviderPress(item)}
      />
    ),
    []
  );

  return (
    <View style={styles.grid}>
      <FlatList
        data={filteredProviders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProviderCard}
        ListEmptyComponent={<View><Text>No Providers Found</Text></View>} // Handle empty list
      />
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    padding: 10,
  },
});

export default ProvidersGrid;
