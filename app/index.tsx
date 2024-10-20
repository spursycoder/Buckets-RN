import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Landing Page</Text>
      <Button
        title="Swipe Up to Next Page"
        onPress={() => router.push("/next")}
      />
      <Button
        title="Swipe Right to Components"
        onPress={() => router.push("/component")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});
