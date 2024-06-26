import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function Intro({ business }) {
  const router = useRouter();

  return (
    <View style={{ marginTop: 20 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ padding: 10 }}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      <View>
        <Image 
          source={{ uri: business?.imageUrl || 'default-image-url' }} // Use a default image URL if imageUrl is undefined
          style={{ height: 240, width: '100%' }} 
          resizeMode="cover" // Ensure the image covers the space properly
        />
      </View>

      <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>
        <Text style={{ fontSize: 24, fontFamily: 'archivo-b' }}>
          {business?.name || 'Business Name'}
        </Text>
        <Text style={{ fontFamily: 'archivo-m', color: 'gray', fontSize: 15, marginTop: 5 }}>
          {business?.address || 'Business Address'}
        </Text>
      </View>
    </View>
  );
}
