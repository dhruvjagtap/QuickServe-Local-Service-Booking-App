import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import ServiceScreen from './screens/ServiceScreen';
import ProviderProfile from './screens/ProviderProfile';
import { Provider } from 'react-redux';
import { store } from './store/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
          <Stack.Screen name="ProviderProfile" component={ProviderProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
