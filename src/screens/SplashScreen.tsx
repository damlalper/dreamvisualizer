import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  navigation: NavigationProp<any>;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      // Minimum splash süresi için 2 saniye bekle
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      
      if (hasSeenOnboarding === 'true') {
        // Onboarding görülmüş, direkt Home'a git
        navigation.replace('Home');
      } else {
        // İlk defa açılıyor, Onboarding'e git
        navigation.replace('Onboarding');
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      // Hata durumunda Onboarding'e git
      navigation.replace('Onboarding');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🌙</Text>
        <Text style={styles.appName}>Dream Visualizer</Text>
        <Text style={styles.tagline}>Rüyalarınızı Görselleştirin</Text>
      </View>
      
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4f46e5" />
          <Text style={styles.loadingText}>Yükleniyor...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    marginBottom: 100,
  },
  logo: {
    fontSize: 80,
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
  },
  loadingText: {
    color: '#ccc',
    marginTop: 10,
    fontSize: 14,
  },
});

export default SplashScreen;