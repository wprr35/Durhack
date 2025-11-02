import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="results" options={{ headerShown: false}} />
      <Stack.Screen name="history" options={{ headerBackTitle: "Home", title: "Legacy"}} />
      <Stack.Screen name="countryhistory" options={{ headerBackTitle: "Home", title: "Country History"}} />
    </Stack>
  );
}
