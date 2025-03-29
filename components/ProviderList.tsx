import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native';

import providers from '../data/updated_service_providers_with_images.json'
import ProviderCard from './ProviderCard';
const ProvidersGrid = () => {
    return (
        <FlatList
            data={providers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProviderCard name={providers.name} />}
            contentContainerStyle={styles.grid}
        />
    );
};

const styles = StyleSheet.create({
    grid: {
        padding: 10,
    },
});

export default ProvidersGrid;
