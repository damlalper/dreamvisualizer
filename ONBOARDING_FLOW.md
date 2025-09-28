# Onboarding Flow - Dream Visualizer

## 📱 Ekran Akışı

```
SplashScreen → Onboarding → PaywallScreen → HomeScreen
```

## 🔄 Flow Detayları

### 1. SplashScreen
- **Süre**: 2 saniye minimum
- **Kontrol**: AsyncStorage ile `hasSeenOnboarding` kontrolü
- **Yönlendirme**: 
  - İlk açılış → Onboarding
  - Daha önce açıldıysa → Home

### 2. Onboarding (4 Slide)
- **Slide 1**: Rüyalarını Kaydet 🌙
- **Slide 2**: Görselleştir 🎨  
- **Slide 3**: Favorile ⭐
- **Slide 4**: Keşfet 🚀
- **Özellikler**:
  - Kaydırmalı geçiş (PagerView)
  - Dot indicator
  - "Atla" ve "İleri/Başla" butonları
  - AsyncStorage ile onboarding durumu kaydedilir

### 3. PaywallScreen
- **Özellikler**: Premium özellikler listesi
- **Fiyatlandırma**: Aylık/Yıllık seçenekler
- **Butonlar**:
  - "Premium'a Geç" (Adapty entegrasyonu için hazır)
  - "Satın Alımları Geri Yükle"
  - "Şimdilik Atla" → Home'a yönlendirir

### 4. HomeScreen
- Ana uygulama ekranı

## 🛠 Teknik Detaylar

### Kullanılan Paketler
- `@react-native-async-storage/async-storage`: Durum yönetimi
- `react-native-pager-view`: Slide geçişleri
- `@react-navigation/stack`: Navigation

### AsyncStorage Keys
- `hasSeenOnboarding`: Onboarding görülme durumu
- `hasPremium`: Premium üyelik durumu
- `hasSkippedPaywall`: Paywall atlama durumu

### Navigation Yapısı
```typescript
Stack.Navigator
├── Splash (initialRouteName)
├── Onboarding
├── Paywall
├── Home
├── DreamInput
├── DreamAnimation
└── Favorites
```

## 🎨 Tasarım Özellikleri

- **Renk Paleti**: Koyu tema (#1a1a2e)
- **Accent Color**: #4f46e5 (mavi)
- **Typography**: Modern, okunabilir fontlar
- **Icons**: Emoji tabanlı görseller
- **Animations**: Smooth geçişler

## 🔧 Adapty Entegrasyonu

PaywallScreen'de Adapty SDK entegrasyonu için hazır alanlar:
- `handlePurchase()`: Satın alma işlemi
- `handleRestore()`: Restore işlemi
- Premium durumu kontrolü

## 📝 Notlar

- Tüm ekranlar headerShown: false ile tam ekran
- Error handling her aşamada mevcut
- Loading states kullanıcı deneyimi için eklendi
- Responsive tasarım farklı ekran boyutları için optimize edildi
