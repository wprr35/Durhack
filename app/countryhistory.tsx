import { Text, View,  StyleSheet, TextInput } from 'react-native';
import { Link,useRouter } from 'expo-router';
import React from 'react';
import { countryfact } from "../app/countryfacts"

let countryhist = countryfact
console.log(countryhist[0])
let len = 10
let index: number;
let flag = false
export function FindCountry(text: string) {
  for (let i=0; i<countryhist.length; i++){
          if (countryhist[i].country == text){
              index = i
              flag = true
              break
          }
        }
        if (flag == true){
          return [countryhist[index].history, countryhist[index].facts]
        }
        else{
          return["", ""]
        }
        
}
export default function History(index: number) {
  const [text, onChangeText] = React.useState('');
  return (
    <View

      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: 'column',
        },
      ]}>

        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder='Enter Country Name'
          placeholderTextColor={'#fefeffff'}
        />
        <Text style={styles.title}>History</Text>
        <Text style={styles.fact}>{FindCountry(text)[0]}</Text>
        <Text style={styles.title}>Fact</Text>
        <Text style={styles.fact}>{FindCountry(text)[1]}</Text>
        
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
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: '#fefeffff',
    borderColor: '#fefeffff',
    width: 154,
    alignContent: "center"  

  },
  fact: {
    margin: 12,
    padding: 10,
    color: '#fefeffff',
    alignContent: "center"  
  },
  title: {
    margin: 12,
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fefeffff',
    textAlign: 'left'
  }
});
