import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Fuse from 'fuse.js';
import serviceProviders from '../data/dummy_service_providers.json';

// Type Definition
interface ServiceProvider {
  id: number;
  name: string;
  profession: string;
}

interface SearchState {
  searchText: string;
  filteredProviders: ServiceProvider[];
  recentSearches: string[];
  loading: boolean;
}

// Initial State
const initialState: SearchState = {
  searchText: '',
  filteredProviders: [],
  recentSearches: [],
  loading: false,
};

// Fuse.js Setup
const fuse = new Fuse(serviceProviders, {
  keys: ['name', 'profession'],
  threshold: 0.3,
});

// Create Slice
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setFilteredProviders: (state, action: PayloadAction<ServiceProvider[]>) => {
      state.filteredProviders = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addRecentSearch: (state, action: PayloadAction<string>) => {
      if (!state.recentSearches.includes(action.payload)) {
        state.recentSearches = [action.payload, ...state.recentSearches].slice(0, 5);
      }
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
    },
    performSearch: (state, action: PayloadAction<string>) => {
      state.loading = true;
      const results = fuse.search(action.payload).map((result) => result.item);
      state.filteredProviders = results.slice(0, 5);
      state.loading = false;
    },
  },
});

export const {
  setSearchText,
  setFilteredProviders,
  setLoading,
  addRecentSearch,
  clearRecentSearches,
  performSearch,
} = searchSlice.actions;
export default searchSlice.reducer;
