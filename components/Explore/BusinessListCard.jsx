import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function BusinessCard({ business }) {
  const router = useRouter();

  // Calculate average rating from business reviews
  const calculateAverageRating = () => {
    if (!business.reviews || business.reviews.length === 0) {
      return 'N/A';
    }

    let totalRating = 0;
    business.reviews.forEach((review) => {
      totalRating += review.rating;
    });

    const averageRating = totalRating / business.reviews.length;
    return averageRating.toFixed(1); // Limit to one decimal place
  };

  return (
    <TouchableOpacity
      onPress={() => router.push("/businessdetail/" + business?.id)}
      style={{
        marginLeft: 15,
        marginRight: 15,
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 5,
        shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2}, 
    shadowOpacity: 0.25,
    shadowRadius: 3.84, 
    elevation: 5
      }}
    >
      <Image
        source={{ uri: business.imageUrl }}
        style={{ height: 90, width: 150, borderRadius: 10 }}
      />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={{ fontFamily: 'archivo-b', fontSize: 18 }}>{business.name}</Text>
        <Text style={{ fontFamily: 'archivo-b', fontSize: 12, color: 'gray' }}>{business.address}</Text>
        <View style={{ display:'flex',flexDirection: 'row', alignItems: 'center', marginTop: 7 , gap:15}}>
          <View style={{display:'flex',flexDirection:'row',}}>
          <Image
            source={require('./../../assets/images/star.png')}
            style={{ height: 15, width: 15 }}
          />
          <Text style={{ fontFamily: 'archivo-b', fontSize: 13, marginLeft: 5 }}>{calculateAverageRating()}</Text>
          </View>
        
          
        </View>
      </View>
    </TouchableOpacity>
  );
}
