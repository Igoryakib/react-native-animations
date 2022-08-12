import React from "react";
import { View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedGestureHandler,
  withTiming,
  useAnimatedProps,
} from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler";

import { CAT_1, CAT_2, CAT_3 } from "../../assets";
import { Bell } from "../../svgComponents/Bell";
import { BrokenHeart } from "../../svgComponents/BrokenHeart";
import { Heart } from "../../svgComponents/Heart";
import { Page } from "./Page/component";
import { styles } from "./styles";

const items = [
  { id: 1, image: CAT_1, color: "violet" },
  { id: 2, image: CAT_2, color: "orange" },
  { id: 3, image: CAT_3, color: "grey" },
];

const HorizontalScroll = () => {
  const translateX = useSharedValue(0);
  const pressedBell = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    console.log(event.contentOffset.x);
    translateX.value = event.contentOffset.x;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        translateX.value,
        [0, 500, 823],
        ["violet", "orange", "grey"]
      ),
    };
  });

    const eventHandlerBell = useAnimatedGestureHandler({
      onStart: (event, ctx) => {
        pressedBell.value = withTiming(4);
      },
      onActive: (event, ctx) => {
        pressedBell.value = withTiming(-4);
      },
      onEnd: (event, ctx) => {
        pressedBell.value = withTiming(0);
      },
    });

    const animatedBell = useAnimatedProps(() => {
      return{
        transform: [{rotate: withTiming(pressedBell.value, {duration: 200})}]
      }
    })

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Animated.ScrollView
        pagingEnabled
        onScroll={scrollHandler}
        style={styles.container}
        horizontal
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {items.map((item, index) => {
          return (
            <Page
              index={index}
              item={item}
              key={item.id}
              translateX={translateX}
            />
          );
        })}
      </Animated.ScrollView>
      <View style={styles.reactionsContainer}>
        <BrokenHeart />
        <Heart />
        <TapGestureHandler onGestureEvent={eventHandlerBell}>
          <Animated.View>
            <Bell animatedProps={animatedBell} />
          </Animated.View>
        </TapGestureHandler>
      </View>
    </Animated.View>
  );
};

export { HorizontalScroll };
