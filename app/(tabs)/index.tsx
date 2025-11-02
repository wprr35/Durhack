import Button from '@/components/Button';
import { Link,useRouter } from 'expo-router';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../(auth)/supabase';
import useSession from '../(auth)/checkSession';

export default function Index() {
  const session = useSession();
  const router = useRouter();
  const d = Dimensions.get("window")
  return (
    <View style={styles.container}>
  
      <Link href="/history" style={styles.button}>
        Olympic Legacy
      </Link>
      <Link href="/countryhistory" style={styles.button}>
        Country History
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
    padding: 15
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
