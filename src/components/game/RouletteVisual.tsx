import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface RouletteVisualProps {
  emoji?: string;
  isSpinning?: boolean;
}

export const RouletteVisual: React.FC<RouletteVisualProps> = ({ emoji = '🎯', isSpinning = true }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSpinning) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      rotateAnim.stopAnimation();
    }
  }, [isSpinning, rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const reverseSpin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  return (
    <View style={styles.container}>
      {/* Outer Ring */}
      <Animated.View style={[styles.outerRing, { transform: [{ rotate: spin }] }]}>
        <View style={[styles.dot, styles.dotTopRight]} />
        <View style={[styles.dot, styles.dotBottomLeft]} />
      </Animated.View>

      {/* Inner Ring */}
      <Animated.View style={[styles.innerRing, { transform: [{ rotate: reverseSpin }] }]}>
        <View style={[styles.dotCyan, styles.dotTopLeft]} />
      </Animated.View>

      {/* Central Gradient Circle */}
      <View style={styles.centerCircleWrapper}>
        <LinearGradient
          colors={['#FF4500', '#FF00A8', '#9D4EDD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.centerGradient}
        >
          <Text style={styles.centerEmoji}>{emoji}</Text>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 32,
  },
  outerRing: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 3,
    borderColor: '#FF00A8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerRing: {
    position: 'absolute',
    width: 175,
    height: 175,
    borderRadius: 87.5,
    borderWidth: 2.5,
    borderColor: '#00F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerCircleWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    shadowColor: '#FF00A8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 12,
  },
  centerGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerEmoji: {
    fontSize: 44,
  },
  dot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF4500',
  },
  dotTopRight: {
    top: 20,
    right: 25,
  },
  dotBottomLeft: {
    bottom: 25,
    left: 20,
  },
  dotCyan: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00F2FE',
  },
  dotTopLeft: {
    top: 15,
    left: 15,
  },
});
