import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationProp } from '@react-navigation/native';

interface PaywallScreenProps {
  navigation: NavigationProp<any>;
}

const PaywallScreen: React.FC<PaywallScreenProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const features = [
    {
      icon: '🎨',
      title: 'Sınırsız Görselleştirme',
      description: 'Rüyalarınızı sınırsız sayıda görselleştirin',
    },
    {
      icon: '💾',
      title: 'Sınırsız Kayıt',
      description: 'İstediğiniz kadar rüya kaydedin',
    },
    {
      icon: '⭐',
      title: 'Premium Özellikler',
      description: 'Tüm premium özelliklerin kilidi açılır',
    },
    {
      icon: '🚀',
      title: 'Öncelikli Destek',
      description: '7/24 öncelikli müşteri desteği',
    },
  ];

  const handlePurchase = async () => {
    setLoading(true);
    try {
      // Adapty SDK entegrasyonu burada olacak
      // Şimdilik mock bir işlem yapıyoruz
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Başarılı satın alma sonrası
      await AsyncStorage.setItem('hasPremium', 'true');
      Alert.alert('Başarılı!', 'Premium üyelik aktif edildi!');
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Hata', 'Satın alma işlemi başarısız oldu.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    try {
      // Paywall'u atladığını kaydet
      await AsyncStorage.setItem('hasSkippedPaywall', 'true');
      navigation.replace('Home');
    } catch (error) {
      console.error('Error saving paywall skip status:', error);
      navigation.replace('Home');
    }
  };

  const handleRestore = async () => {
    setLoading(true);
    try {
      // Adapty restore işlemi burada olacak
      await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert('Bilgi', 'Restore işlemi tamamlandı.');
    } catch (error) {
      Alert.alert('Hata', 'Restore işlemi başarısız oldu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Premium'a Geç</Text>
          <Text style={styles.subtitle}>
            Rüya dünyanızı tam potansiyeliyle keşfedin
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.pricingContainer}>
          <View style={styles.priceBox}>
            <Text style={styles.priceLabel}>Aylık</Text>
            <Text style={styles.price}>₺29.99</Text>
            <Text style={styles.pricePeriod}>/ay</Text>
          </View>
          <View style={styles.priceBox}>
            <Text style={styles.priceLabel}>Yıllık</Text>
            <Text style={styles.price}>₺199.99</Text>
            <Text style={styles.pricePeriod}>/yıl</Text>
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>Popüler</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.purchaseButton, loading && styles.disabledButton]}
          onPress={handlePurchase}
          disabled={loading}
        >
          <Text style={styles.purchaseButtonText}>
            {loading ? 'İşleniyor...' : 'Premium\'a Geç'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.restoreButton}
          onPress={handleRestore}
          disabled={loading}
        >
          <Text style={styles.restoreButtonText}>Satın Alımları Geri Yükle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
          disabled={loading}
        >
          <Text style={styles.skipButtonText}>Şimdilik Atla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  featureIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  pricingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  priceBox: {
    flex: 1,
    backgroundColor: '#2d2d44',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    position: 'relative',
  },
  priceLabel: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 5,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4f46e5',
  },
  pricePeriod: {
    fontSize: 12,
    color: '#ccc',
  },
  popularBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#4f46e5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  purchaseButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  disabledButton: {
    backgroundColor: '#6b7280',
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  restoreButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  restoreButtonText: {
    color: '#4f46e5',
    fontSize: 16,
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#9ca3af',
    fontSize: 16,
  },
});

export default PaywallScreen;
