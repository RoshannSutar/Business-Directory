import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Category from '../Home/Category'
import { Colors } from '@/constants/Colors'
import {  useRouter } from 'expo-router'

export default function BusinessListCard({business}) {
    const router= useRouter();
  return (
    
    <TouchableOpacity
            style={{marginLeft:15,marginRight:15, padding:10, borderRadius:15, backgroundColor: '#fff', display:'flex', flexDirection:'row', gap:10, marginBottom:5,marginTop:10}} 
            onPress={()=>router.push('/businessdetail/'+business.id)}>
            <Image source={{ uri: business.imageUrl }}
                style={{ height: 90, width: 150, borderRadius:10 }} />
            <View style={{marginTop:7,flex:1}}>
                <Text style={{fontFamily:'archivo-b', fontSize:18}}>{business.name}</Text>
                <Text style={{fontFamily:'archivo-b', fontSize:12, color:'gray'}}>{business.address}</Text>
                <View style={{display :'flex', flexDirection: 'row', gap:10 ,marginTop:7}}>
                    <View style={{display:'flex', flexDirection:'row', gap: 5}}>
                    <Image source={require('./../../assets/images/star.png')}
                    style={{height:15, width:15}}/>
                    <Text style={{fontFamily:'archivo-b', fontSize:13}}>4.5</Text>
                    </View>
                   
                </View>
            </View>
        </TouchableOpacity>
  )
}