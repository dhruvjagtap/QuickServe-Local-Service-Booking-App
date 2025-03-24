import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import Fuse from 'fuse.js';
import serviceProviders from '../data/dummy_service_providers.json';

type ServiceProvider = {
  id: number;
  name: string;
  profession: string;
};

// Debounce function
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
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  // Fuse.js configuration
  const fuse = new Fuse(serviceProviders, {
    keys: ['name', 'profession'],
    threshold: 0.3,
  });

  // Debounced search function (memoized)
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      if (text) {
        const results = fuse.search<ServiceProvider>(text).map((result) => result.item);
        setFilteredProviders(results);
        setShowSuggestions(true); // Show suggestions when user types
      } else {
        setFilteredProviders([]);
        setShowSuggestions(false); // Hide suggestions if no text
      }
    }, 300),
    []
  );

  // Trigger search on input change
  useEffect(() => {
    debouncedSearch(searchText);
  }, [searchText, debouncedSearch]);

  // Add search term to recent searches
  const addToRecentSearches = (text: string) => {
    if (!text) return;
    setRecentSearches((prev) => {
      const updatedSearches = prev.filter((item) => item !== text);
      return [text, ...updatedSearches].slice(0, 5); // Keep only 5 recent searches
    });
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    if (searchText.trim()) {
      addToRecentSearches(searchText);
      setShowSuggestions(false); // Hide suggestions after submit
      setSearchText('');
    }
  };

  // Delete a recent search item
  const deleteRecentSearch = (item: string) => {
    setRecentSearches((prev) => prev.filter((search) => search !== item));
  };

  // Clear all recent searches
  const clearHistory = () => {
    setRecentSearches([]);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={handleSearchSubmit}>
          <Image source={require('../assets/search.png')} style={styles.icon} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search..."
          onFocus={() => setShowSuggestions(true)}
          onSubmitEditing={handleSearchSubmit}
        />

        <TouchableOpacity onPress={() => console.log('Microphone Pressed!')}>
          <Image source={require('../assets/microphone.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* List of Recent Searches */}
      {!searchText && recentSearches.length > 0 && (
        <FlatList
          data={recentSearches}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSearchText(item)}>
              <View style={styles.recentItem}>
                <Text>{item}</Text>
                <TouchableOpacity onPress={() => deleteRecentSearch(item)}>
                  <Text style={styles.deleteText}>×</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          ListHeaderComponent={
            <TouchableOpacity onPress={clearHistory}>
              <Text style={styles.clearText}>Clear History</Text>
            </TouchableOpacity>
          }
        />
      )}

      {/* Search Suggestions */}
      {searchText && showSuggestions && (
        <FlatList
          data={filteredProviders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSearchText(item.name)}>
              <View style={styles.resultItem}>
                <Text>
                  {item.name} - {item.profession}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
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
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
  clearText: {
    textAlign: 'right',
    color: 'blue',
    marginBottom: 10,
  },
  resultItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Search;
