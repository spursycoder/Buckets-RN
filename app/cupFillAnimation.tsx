import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";

const CupFillAnimation = ({ initialValue = 0, totalCapacity = 100 }) => {
  const [currentValue, setCurrentValue] = useState(initialValue);
  const fillHeight = useRef(
    new Animated.Value((initialValue / totalCapacity) * 100)
  ).current;

  const handlePress = (amount) => {
    const newValue = Math.max(
      0,
      Math.min(currentValue + amount, totalCapacity)
    );
    setCurrentValue(newValue);

    const newFillPercentage = (newValue / totalCapacity) * 100;

    // Animate the fill height to the new percentage
    Animated.timing(fillHeight, {
      toValue: newFillPercentage,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const fillStyle = {
    height: fillHeight.interpolate({
      inputRange: [0, 100, 110],
      outputRange: ["0%", "100%", "110%"], // Allow overflow for effect
    }),
    backgroundColor: currentValue > totalCapacity ? "#4DB6AC" : "#1E88E5", // Color change on overflow
    width: "100%",
  };

  return (
    <View style={styles.container}>
      {/* Glass container */}
      <View style={styles.glassContainer}>
        <View style={styles.glass}>
          {/* Animated filling */}
          <Animated.View style={[styles.fill, fillStyle]} />
        </View>
      </View>

      {/* Buttons to fill or empty the cup */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress(10)}>
          <Text style={styles.buttonText}>Add 10</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress(-10)}
        >
          <Text style={styles.buttonText}>Remove 10</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  glassContainer: {
    width: 150,
    height: 200,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  glass: {
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
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
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
