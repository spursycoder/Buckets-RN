import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";

const CupFillAnimation = () => {
  const [fillPercentage, setFillPercentage] = useState(0);
  const fillHeight = useRef(new Animated.Value(0)).current;
  const overflowOpacity = useRef(new Animated.Value(0)).current;

  // Function to handle button press
  const handlePress = () => {
    if (fillPercentage < 100) {
      // Increase the fill percentage by 10
      const newFillPercentage = fillPercentage + 10;
      setFillPercentage(newFillPercentage);

      // Animate the fill height based on the percentage
      Animated.timing(fillHeight, {
        toValue: newFillPercentage,
        duration: 500, // duration of the fill animation
        useNativeDriver: false,
      }).start();

      // Trigger overflow animation if 100% reached
      if (newFillPercentage >= 100) {
        triggerOverflow();
      }
    }
  };

  // Overflow animation function
  const triggerOverflow = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(overflowOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overflowOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  // Animated styles for cup fill and overflow
  const fillStyle = {
    height: fillHeight.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
    }),
    backgroundColor: "blue",
    width: "100%",
    position: "absolute",
    bottom: 0,
  };

  const overflowStyle = {
    opacity: overflowOpacity,
    backgroundColor: "blue",
    width: "100%",
    height: 10,
    position: "absolute",
    top: -10,
  };

  return (
    <View style={styles.container}>
      <View style={styles.cup}>
        {/* Filling animation */}
        <Animated.View style={[styles.fill, fillStyle]} />

        {/* Overflow animation */}
        {fillPercentage >= 100 && <Animated.View style={overflowStyle} />}
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Fill Cup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cup: {
    width: 100,
    height: 200,
    borderWidth: 2,
    borderColor: "#333",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    position: "relative",
    borderTopWidth: 0,
  },
  fill: {
    position: "absolute",
    bottom: 0,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CupFillAnimation;
