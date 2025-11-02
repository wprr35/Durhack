import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Link ,useRouter} from 'expo-router';
import {supabase} from "./supabase";


export default function App() {
  // State variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Function to handle sign-up action
  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    Alert.alert("Error", error.message);
  } else {
    Alert.alert("Success", "Check your email to confirm your account!");
  }
    // If all is good, show a success message (or handle your API call here)
    // Alert.alert("Success", `Signed up with ${email}`);
    router.replace('/sign-in');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Sign Up Button */}
      <Button title="Sign Up" onPress={handleSignUp} />

      {/* Additional info */}
      <View style={styles.footer}>
        <Text>Already have an account?</Text>
        <Text style={styles.link} >
          <Link href="/sign-in" >Log In</Link>
        </Text>
      </View>
    </View>
  );
}

// Basic styles for the form
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
