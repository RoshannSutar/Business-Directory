import { View, Text } from 'react-native';
import React from 'react';

export default function About({ business }) {
  return (
    <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
      <Text style={{ fontFamily: 'archivo-b', fontSize: 18, color: 'gray' }}>About</Text>
      <View 
        style={{ 
          marginLeft: 5, 
          marginRight: 5, 
          padding: 10, 
          backgroundColor: '#f0f8ff', 
          borderRadius: 10, 
          marginTop: 10 
        }}
      >
        <Text 
          style={{ 
            fontFamily: 'archivo-m', 
            fontSize: 14, 
            color: 'gray' 
          }}
        >
          {business?.about}
        </Text>
      </View>
    </View>
  );
}
