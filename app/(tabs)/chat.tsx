import { StyleSheet, Text, View } from 'react-native';
import {useRouter} from 'expo-router';
import { supabase } from '../(auth)/supabase';
import useSession from '../(auth)/checkSession';
import { useEffect } from 'react';

export default function Chat() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session === null) return; // still loading
    if (!session) router.replace('/sign-in'); // redirect if not logged in
  }, [session]);

  // Show Loading only while session is null
  if (session === null) return <Text>Requires sign in</Text>;

  return (
    <View>
      <Text>{session ? `Logged in as ${session.user.email}: userId ${session.user.id}` : 'Not logged in'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});

  // const router = useRouter();
  // const session = useSession();
  // console.log(session);
  // if(session){
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.text}>About screen</Text>
  //     </View>
  //   );
  // } else {
  //   router.replace('/sign-in');
  // }