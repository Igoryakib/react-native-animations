import React, { FC } from "react";
import { View, Image, Dimensions } from "react-native";
import Animated, { Extrapolate, interpolate } from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { styles } from "./styles";
type IProps = {
  item: { image: any };
  index: number;
  translateX: Animated.SharedValue<number>;
};

const { width } = Dimensions.get("window");

const SQUARE_SIDE = width / 1.25;

const Page: FC<IProps> = ({ item, index, translateX }) => {
  const pressed = useSharedValue(false);
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);
  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true;
    },
    onActive: (event, ctx) => {
      x.value = startingPosition + event.translationX;
      y.value = startingPosition + event.translationY;
    },
    onEnd: (event, ctx) => {
      pressed.value = false;
      x.value = withSpring(startingPosition);
      y.value = withSpring(startingPosition);
    },
  });
  const animatedCat = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    const scale = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        { scale: withSpring(pressed.value ? 1.5 : 1) },
        { translateX: x.value },
        { translateY: y.value },
        { scale },
      ],
      opacity,
    };
  });
  const animatedSquare = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    const borderRadius = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [SQUARE_SIDE / 5, SQUARE_SIDE / 2, SQUARE_SIDE / 5],
      Extrapolate.CLAMP
    );
    return {
      borderRadius,
      transform: [{ scale }],
    };
  });
  return (
    <Animated.View key={index} style={styles.page}>
      <Animated.View style={[styles.square, animatedSquare]}></Animated.View>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.imageContainer, animatedCat]}>
          <Image source={item.image} style={styles.image} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export { Page };
