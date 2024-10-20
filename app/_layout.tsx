import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="next" />
      <Stack.Screen name="component" />
    </Stack>
  );
}
