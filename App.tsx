import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { HorizontalScroll } from "./screens/HorizontalScroll";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <HorizontalScroll />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
