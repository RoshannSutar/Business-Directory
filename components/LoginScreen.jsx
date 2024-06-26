import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import * as WebBrowser from "expo-web-browser";
import { Colors } from './../constants/Colors';
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { Feather } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={{ backgroundColor: '#667BC6', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('@/assets/images/login-1.png')}
        style={{ height: 300, width: 300 , margin: '20%'}} />

      <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center'  }}>
        <Text style={{ fontFamily: 'archivo-b', fontSize: 35, color: 'white' }}>
          bizHUB |
        </Text>
        <Text style={{ fontFamily: 'archivo-b', fontSize: 20, color: '#EEEDEB' }}>
          Business Directory
        </Text>
      </View>

      <TouchableOpacity onPress={() => onPress()}
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20, backgroundColor: 'black', borderRadius: 30, paddingVertical: 10, paddingHorizontal: 30, position: 'relative', marginTop: 30 }}>
        <Text style={{ fontFamily: 'archivo-b', fontSize: 22, color: 'white' }} >
          Login
        </Text>
        <Feather name="arrow-right" size={24} color="white" />
      </TouchableOpacity>



    </View>
  );
}

