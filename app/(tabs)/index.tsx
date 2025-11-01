import Button from '@/components/Button';
import { Link,useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { supabase } from '../(auth)/supabase';
import useSession from '../(auth)/checkSession';


export default function Index() {
  const session = useSession();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Link href="/quiz" style={styles.button}>
        Go to About screen
      </Link>
      {session ? (
        <Text
          style={styles.button}
          onPress={async () => {
            await supabase.auth.signOut();
            router.replace('/sign-in'); // optional redirect
          }}
        >
          Sign Out
        </Text>
      ) : (
        <Link href="/sign-up" style={styles.button}>
          Sign Up
        </Link>
      )}
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
