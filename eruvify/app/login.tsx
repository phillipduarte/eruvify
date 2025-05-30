import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import Theme from '@/constants/Theme';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }
    
    setIsLoading(true);
    const { error } = await signIn(email, password);
    setIsLoading(false);
    
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      // Successful login - will be redirected by auth state change
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/eruvify-logo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
          <Text style={styles.title}>Eruvify</Text>
          <Text style={styles.subtitle}>Your Eruv Management App</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <TouchableOpacity 
            style={styles.button}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footerText}>
            <Text style={styles.text}>Don't have an account? </Text>
            <Link href="/signup" style={styles.link}>
              <Text style={styles.linkText}>Sign Up</Text>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  content: {
    flex: 1,
    padding: Theme.spacing.lg,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: Theme.spacing.md,
  },
  title: {
    fontSize: Theme.typography.fontSize.xxl,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.gray[600],
  },
  formContainer: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.gray[300],
    borderRadius: Theme.sizes.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    fontSize: Theme.typography.fontSize.md,
    backgroundColor: Theme.colors.white,
  },
  button: {
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.sizes.borderRadius.md,
    padding: Theme.spacing.md,
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  buttonText: {
    color: Theme.colors.white,
    fontSize: Theme.typography.fontSize.md,
    fontWeight: '600',
  },
  footerText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Theme.spacing.md,
  },
  text: {
    color: Theme.colors.gray[600],
  },
  link: {
  },
  linkText: {
    color: Theme.colors.primary,
    fontWeight: '600',
  },
});