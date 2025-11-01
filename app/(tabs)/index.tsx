import Button from '@/components/Button';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';


export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Link href="/quiz" style={styles.button}>
        Go to About screen
      </Link>
      <Link href="/sign-up" style={styles.button}>
        Sign Up
      </Link>
      <Button label="Choose a photo" />
      <Button label="Use this photo" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
