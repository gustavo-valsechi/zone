import React, { useEffect } from 'react';
import { Animated, View } from 'react-native';

export default function LoadingBar(props) {
  const colorValue = new Animated.Value(0);

  const black = ['rgba(0, 0, 0, 0.15)', 'rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.15)']
  const white = ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.15)']

  const colorAnimation = colorValue.interpolate({
    inputRange: [0, 50, 100],
    outputRange: props.white ? white : black
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(colorValue, {
        toValue: 100,
        duration: 2000,
        useNativeDriver: false
      })
    ).start();
  }, [colorValue]);

  return (
    <Animated.View
      style={{
        width: props.circle ? props.circle : props.width || '100%',
        height: props.circle ? props.circle : props.height || '100%',
        borderRadius: props.circle ? props.circle / 2 : props.borderRadius || 10,
        marginTop: props.mt || 0,
        marginBottom: props.mb || 0,
        marginLeft: props.ml || 0,
        marginRight: props.mr || 0,
        backgroundColor: colorAnimation
      }}
    >
      <View style={{ height: '100%', width: '100%' }} />
    </Animated.View>
  )
}