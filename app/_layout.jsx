import {useFonts} from 'expo-font';
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import {ClerkProvider, SignedIn, SignedOut} from '@clerk/clerk-expo'
import LoginScreen from '@/components/LoginScreen';
import * as SecureStore from "expo-secure-store";

const tokenCache = {
    async getToken(key) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key, value) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };
export default function RootLayout(){
    useFonts({
        'archivo':require('./../assets/fonts/Archivo-Regular.ttf'),
        'archivo-m':require('./../assets/fonts/Archivo-Medium.ttf'),
        'archivo-b':require('./../assets/fonts/Archivo-Bold.ttf'),

    })
    
    return(
        <ClerkProvider tokenCache={tokenCache}
         publishableKey={process.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <SignedIn>
        <Stack screenOptions={{
            headerShown:false
        }}>
            <Stack.Screen name='(tab)'/>
        </Stack>
        </SignedIn>
        <SignedOut>
            <LoginScreen/>
        </SignedOut>
        </ClerkProvider>
    )
}