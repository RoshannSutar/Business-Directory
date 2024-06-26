import { View, Text, Image } from 'react-native'
import React, { cloneElement } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function UserInfo() {
  const { user } = useUser();
  return (

    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20%'  }}>
      
          <Image source={{ uri: user?.imageUrl }}
            style={{
              height: 90,
              width: 90,
              borderRadius: 99,
              borderColor: 'black',
              borderWidth: 1,
            }} />
        

      <View>
        <Text style={{ fontSize: 18, fontFamily: 'archivo-b', marginTop: 10, textAlign: 'center' }}>
          {user?.fullName}
        </Text>
        <Text style={{ fontSize: 14, fontFamily: 'archivo', textAlign: 'center', color:'gray' }}>
          {user?.primaryEmailAddress?.emailAddress}
        </Text>

      </View>
    </View>
  )
}