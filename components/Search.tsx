import React, { useState, useEffect, useCallback, useMemo, startTransition } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Fuse from 'fuse.js';
import serviceProviders from '../data/updated_service_providers_with_images.json';

// Type definition for Service Provider
interface ServiceProvider {
  id: number;
  name: string;
  profession: string;
}

// Debounce utility
const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>): void => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp>();


  type RootStackParamList = {
    ProviderProfile: { provider: ServiceProvider };
  };
  
  type NavigationProp = StackNavigationProp<RootStackParamList, 'ProviderProfile'>;

  const navigateToProviderProfile = (provider: ServiceProvider) => {
    navigation.navigate('ProviderProfile', { provider });
  };
  
  

  // Fuse.js configuration
  const fuse = useMemo(() => new Fuse(serviceProviders, {
    keys: ['name', 'profession'],
    threshold: 0.3,
  }), []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      if (!text) {
        setFilteredProviders([]);
        return;
      }
      setLoading(true);
      const results = fuse.search(text).map((result) => result.item);
      startTransition(() => {
        setFilteredProviders(results.slice(0, 5)); // Limit to 5 suggestions
        setLoading(false);
      });
    }, 300),
    [fuse]
  );

  // Manage dropdown auto-hide timer
  useEffect(() => {
    if (showDropdown) {
      const hideDropdown = setTimeout(() => setShowDropdown(false), 5000);
      return () => clearTimeout(hideDropdown);
    }
  }, [showDropdown, searchText]);

  // Trigger search when input changes
  useEffect(() => {
    debouncedSearch(searchText);
    setShowDropdown(!!searchText || recentSearches.length > 0);
  }, [searchText, debouncedSearch, recentSearches]);

  // Add to recent searches (max: 5 items)
  const addToRecentSearches = (text: string) => {
    if (!text) return;
    setRecentSearches((prev) => {
      const updatedSearches = prev.filter((item) => item !== text);
      return [text, ...updatedSearches].slice(0, 5);
    });
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    if (searchText.trim()) {
      addToRecentSearches(searchText);
      setSearchText('');
      setShowDropdown(false);
      Keyboard.dismiss();
    }
  };

  // Delete an individual recent search
  const deleteRecentSearch = (item: string) => {
    setRecentSearches((prev) => prev.filter((search) => search !== item));
  };

  // Clear all recent searches
  const clearHistory = () => {
    setRecentSearches([]);
    setShowDropdown(false);
  };

  // Render search suggestions
  const renderSuggestion: ListRenderItem<ServiceProvider> = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSearchText(item.name);
        handleSearchSubmit();
        navigateToProviderProfile(item);
      }}
      accessibilityLabel={`Select ${item.name}`}
    >
      <View style={styles.resultItem}>
        <Text>{item.name} - {item.profession}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render recent search items
  const renderRecentItem: ListRenderItem<string> = ({ item }) => (
    <View style={styles.recentItem}>
      <TouchableOpacity onPress={() => setSearchText(item)}>
        <Text>{item}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteRecentSearch(item)}>
        <Image source={require('../assets/close.png')} style={styles.closeIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={handleSearchSubmit} accessibilityLabel="Submit Search">
          <Image source={require('../assets/search.png')} style={styles.icon} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search Services..."
          onFocus={() => setShowDropdown(true)}
          onSubmitEditing={handleSearchSubmit}
          accessibilityLabel="Search Input"
        />

        <TouchableOpacity onPress={() => console.log('Microphone Pressed!')}>
          <Image source={require('../assets/microphone.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Dropdown */}
      {showDropdown && (
        <View style={styles.dropdown}>
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : searchText ? (
            <FlatList
              data={filteredProviders}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderSuggestion}
              ListEmptyComponent={<Text style={styles.noResults}>No Providers Found!</Text>}
            />
          ) : (
            <FlatList
              data={recentSearches}
              keyExtractor={(item) => item}
              renderItem={renderRecentItem}
              ListFooterComponent={
                recentSearches.length > 0 ? (
                  <TouchableOpacity onPress={clearHistory}>
                    <Text style={styles.clearText}>Clear History</Text>
                  </TouchableOpacity>
                ) : null
              }
            />
          )}
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    backgroundColor: '#f0f0f0',
    paddingTop: 45,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    width: '93%',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  dropdown: {
    position: 'absolute',
    top: 70,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5,
    zIndex: 999,
    maxHeight: 250,
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  resultItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  clearText: {
    textAlign: 'center',
    color: 'blue',
    marginVertical: 10,
  },
  noResults: {
    textAlign: 'center',
    paddingVertical: 10,
    color: '#888',
  },
});

export default Search;
