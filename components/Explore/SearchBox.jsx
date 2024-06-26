import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

export default function SearchBox({ searchQuery, setSearchQuery }) {
  return (
    <View>
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      backgroundColor: "white",
      borderRadius: 20,
      padding: 5,
      margin: 10,
      marginTop: 20,
      borderWidth: 1,
      borderColor: Colors.PRIMARY
    }}>
      <Ionicons name="search-sharp" size={24} color={Colors.PRIMARY} />
      <TextInput
        placeholder='Search...'
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        style={{ flex: 1 }}
      />
    </View>
    <View  style={{display:'flex', flexDirection:'row', alignItems:'center',gap:5, marginHorizontal:10, marginVertical: 5}}>
      <Text style={{fontFamily:'archivo-b', fontSize: 18 }}>
        Explore more by categories 
      </Text>
      <MaterialIcons name="explore" size={24} color={Colors.PRIMARY} />
    </View>
    </View>
  );
}
