import { Text, View,  StyleSheet } from 'react-native';
import { Link,useRouter } from 'expo-router';

export default function History() {
  return (
    <View style={styles.container}>
      <Text style={styles.introtext}>It is your moment athlete, to join the legion of legends. Show the world the result of your blood, sweat and tears, every session in the gym, every session as the seasons turned, every relic serves to herald your greatness</Text>
      <Text style={styles.textbody}>Every four years, the world stops to breathe the same air of excitement. 
        The Olympics are more than sport,they’re a heartbeat that connects humanity. From the dusty grounds of 
        ancient Greece to the glowing arenas of today, the Games remind us that strength and spirit are timeless, 
        and that even in our differences, we share the same desire to rise above.{'\n'}{'\n'}
        The Olympics unite where words and politics often divide. For a few weeks, flags don’t separate us,
        they dance together. Athletes from every corner of the world chase the same dream, teaching us that 
        courage, respect, and determination speak a universal language. When one wins, we all feel the victory.{'\n'}{'\n'}
        The legacy of the Games lives in stories of human triumph; Jesse Owens defying hate, the first women 
        breaking boundaries, Paralympians proving that limits exist only in the mind. The Refugee Team reminds us that hope 
        has no nationality. Each story burns brighter than any torch, showing that greatness is born from 
        persistence and belief. {'\n'}{'\n'}Cities that host the Games are transformed, not just in skyline but in spirit. 
        For a brief moment, the world’s heartbeat echoes through their streets. The true legacy isn’t in the 
        concrete or the medals, it’s in the hope that stays behind, the reminder that progress and unity are possible
        when people dream together. {'\n'}{'\n'}And when the flame is finally extinguished, its light continues to glow within us. 
        Every child watching believes a little more in their own potential. Faster, Higher, Stronger; not just for athletes,
         but for all of humanity. The Olympics are a mirror of our best selves, reminding us that through effort and unity,
          we can rise, always higher, always together.</Text>
        
        <Link href="https://www.olympics.com/ioc/olympic-legacy" style={styles.button}>
                Read about Olympic Legacy on their page
              </Link>
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
  introtext: {
    color: '#fff',
    padding: 10,
    fontWeight: 'bold'
  },
  textbody: {
    color: '#fff',
    padding: 10,
    fontSize: 12
    
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
