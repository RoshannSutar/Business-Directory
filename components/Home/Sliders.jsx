import { View, Text,FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../config/FirebaseConfig';
import {query , collection, getDocs} from 'firebase/firestore'

export default function Sliders() {
    const [sliderList, setSliderList]=useState([])
    useEffect(()=>{
        getSliderList()
    },[])
    const getSliderList=async()=>{
        setSliderList([]);
            const q = query(collection(db,'Slider'));
            const querySnapshot=await getDocs(q);
            querySnapshot.forEach((doc)=>{
                setSliderList(prev=>[...prev,doc.data()]);
            })
    }
  return (
    <View style={{margin:10}}>
      <Text style={{fontFamily:'archivo-b', fontSize: 16, marginLeft:5, marginBottom:5}}>
        #Trending on bizHUB
      </Text>
      
      <FlatList
      data ={sliderList}
      horizontal = {true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item})=>(
        <Image source={{uri:item.image}}
        style={{height:160, width:300, borderRadius:20, marginRight:20}}/>
      )
      }
      />
    </View>
  )
}