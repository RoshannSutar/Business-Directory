import { Colors } from "@/constants/Colors";
import { Text, View, Image, TouchableOpacity } from "react-native";
import React from 'react';

export default function CategoryItem({ category, onCategoryPress }) {
  return (
    <TouchableOpacity 
      onPress={() => onCategoryPress(category)}
      style={{
        marginLeft: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center" // Center items horizontally
      }}>
      <View style={{
          height: 60, 
          width: 60, 
          borderRadius: 10,
          marginBottom: 10, 
          borderWidth: 0.3,
          borderColor:'gray',
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:"#EEF5FF",
        }}>
      <Image 
        source={{ uri: category.icon }}
        style={{
          height: 50, 
          width: 50,
          resizeMode:'contain'
          
        }}
      /> 
      </View> 
      <Text style={{ textAlign: "center" , fontFamily:'archivo-b', fontSize:12}}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}
