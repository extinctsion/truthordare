import mobileAds, {
  InterstitialAd,
  AdEventType,
  AdsConsent,
} from 'react-native-google-mobile-ads';
import { getInterstitialAdUnitId } from '../config/ads';

let interstitialAd: InterstitialAd | null = null;
let isAdLoaded = false;
let isAdLoading = false;
let isInitialized = false;

/**
 * Initialize Google Mobile Ads SDK and gather GDPR / UMP Consent
 */
export const initializeAds = async (): Promise<void> => {
  if (isInitialized) return;

  try {
    // 1. Gather GDPR / UMP consent from European / regulated users if required
    try {
      await AdsConsent.gatherConsent();
    } catch (consentError) {
      console.warn('[AdMob] Consent gathering error (continuing):', consentError);
    }

    // 2. Initialize the Mobile Ads SDK
    await mobileAds().initialize();
    isInitialized = true;

    // 3. Preload the first interstitial ad
    preloadInterstitialAd();
  } catch (error) {
    console.warn('[AdMob] Initialization failed:', error);
  }
};

/**
 * Preload an Interstitial Ad ahead of time so it is ready when needed
 */
export const preloadInterstitialAd = (): void => {
  if (isAdLoading || isAdLoaded) return;

  try {
    const adUnitId = getInterstitialAdUnitId();
    interstitialAd = InterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: false,
    });

    isAdLoading = true;

    const unsubscribeLoaded = interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
      isAdLoaded = true;
      isAdLoading = false;
      unsubscribeLoaded();
    });

    const unsubscribeError = interstitialAd.addAdEventListener(AdEventType.ERROR, (error) => {
      console.warn('[AdMob] Interstitial failed to load:', error);
      isAdLoaded = false;
      isAdLoading = false;
      unsubscribeError();
    });

    interstitialAd.load();
  } catch (err) {
    console.warn('[AdMob] Error setting up interstitial:', err);
    isAdLoaded = false;
    isAdLoading = false;
  }
};

/**
 * Show the preloaded Interstitial Ad.
 * Invokes onComplete callback immediately if the ad is not ready or after the user closes the ad.
 */
export const showInterstitialAd = async (onComplete?: () => void): Promise<void> => {
  let completed = false;

  const handleComplete = () => {
    if (!completed) {
      completed = true;
      isAdLoaded = false;
      isAdLoading = false;
      // Preload next ad for the next game / round
      setTimeout(() => preloadInterstitialAd(), 1000);
      if (onComplete) {
        onComplete();
      }
    }
  };

  if (!interstitialAd || !isAdLoaded) {
    // Ad not ready or failed to load - proceed gracefully without blocking user
    handleComplete();
    preloadInterstitialAd();
    return;
  }

  try {
    const unsubscribeClosed = interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
      unsubscribeClosed();
      handleComplete();
    });

    const unsubscribeError = interstitialAd.addAdEventListener(AdEventType.ERROR, (err) => {
      console.warn('[AdMob] Interstitial show error:', err);
      unsubscribeError();
      handleComplete();
    });

    // Safety timeout in case ad presentation freezes or doesn't fire closed event
    setTimeout(() => {
      if (!completed) {
        handleComplete();
      }
    }, 10000);

    await interstitialAd.show();
  } catch (error) {
    console.warn('[AdMob] Failed to show interstitial ad:', error);
    handleComplete();
  }
};
