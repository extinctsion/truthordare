import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

/**
 * Google AdMob Configuration
 *
 * Replace the production IDs with the exact IDs from your Google AdMob console:
 * - App ID: Apps > App Settings
 * - Interstitial Unit ID: Apps > Ad Units
 */
export const ADS_CONFIG = {
  // Production AdMob App ID
  ANDROID_APP_ID: 'ca-app-pub-5563332791377215~2881364457',

  // Production Interstitial Ad Unit ID
  ANDROID_INTERSTITIAL_AD_UNIT_ID: 'ca-app-pub-5563332791377215/6649308364',
};

/**
 * Returns the appropriate ad unit ID based on environment (Test IDs during development, Production IDs in release)
 */
export const getInterstitialAdUnitId = (): string => {
  if (__DEV__) {
    return TestIds.INTERSTITIAL;
  }

  if (Platform.OS === 'android') {
    return ADS_CONFIG.ANDROID_INTERSTITIAL_AD_UNIT_ID || TestIds.INTERSTITIAL;
  }

  return TestIds.INTERSTITIAL;
};
