import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useLocalSearchParams } from 'expo-router'
import { db } from '@/config/FirebaseConfig'
import {  doc, getDoc} from 'firebase/firestore';
import { Colors } from '@/constants/Colors';
import Intro from '@/components/BusinessDetail/Intro';
import ActionButton from '@/components/BusinessDetail/ActionButton';
import About from '@/components/BusinessDetail/About';
import Review from '@/components/BusinessDetail/Review';

export default function businessId() {
    const {businessid}=useLocalSearchParams();
    const [business,setBusiness]=useState();
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        getBusinessDetailById();
        
    },[])

    const getBusinessDetailById=async()=>{
        // setBusinessDetailById([]);
            const docRef = doc(db, 'BusinessList',businessid)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()){
                
                setBusiness({id:docSnap.id ,...docSnap.data()});
                setLoading(false)
            }else{
                console.log("no such directory found")
                setLoading(false)
            }
        }
  return (
    <ScrollView style={{backgroundColor:'white'}}>
        {
            loading?<ActivityIndicator
            style={{alignItems:'center', justifyContent:'center',flex:1}}
            size={50}
            color={Colors.PRIMARY}/>:
            <View>
                <Intro business={business}/>
                <ActionButton business={business}/>
                <About business={business}/>
                <Review business={business}/>
                </View>
                
                    
        
        }
        <View style={{backgroundColor:'white', height:50, width:'100%'}}>

        </View>
    </ScrollView>
        
  )
}
