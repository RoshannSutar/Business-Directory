import { View, Text, TouchableOpacity } from 'react-native'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import Menu from '@/components/Profile/Menu'
import React from 'react'
import UserInfo from '@/components/Profile/UserInfo'
import { useRouter } from 'expo-router'

export default function Profile() {
  const router = useRouter()
  return (
    <View style={{backgroundColor:'#ffffff',height:'100%'}}>
      <View style={{ backgroundColor: Colors.PRIMARY }}>
        <View style={{ marginTop: 25, marginLeft: 10, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', padding: 5 }}>
          <TouchableOpacity onPress={() => router.back()}><Ionicons name="chevron-back" size={24} color="white" /></TouchableOpacity>
          <Text style={{ fontFamily: 'archivo-b', fontSize: 24, color: 'white' }}>Profile</Text>
        </View>
      </View>
      {/* user info */}
      <UserInfo/>

      {/* menu */}
      <Menu/>
    </View>
  )
}