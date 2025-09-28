import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import Onboarding from './screens/Onboarding';
import PaywallScreen from './screens/PaywallScreen';
import DreamInputScreen from './screens/DreamInputScreen';
import DreamAnimationScreen from './screens/DreamAnimationScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Paywall" component={PaywallScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DreamInput" component={DreamInputScreen} />
        <Stack.Screen name="DreamAnimation" component={DreamAnimationScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;