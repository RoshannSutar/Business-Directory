import { View, Text, FlatList,Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { db } from '@/config/FirebaseConfig'
import { getDocs, where,query ,collection} from 'firebase/firestore';
import BusinessListCard from '@/components/BusinessList/BusinessListCard';
import { Colors } from '@/constants/Colors';


export default function BusinessListByCategory() {
    const navigation = useNavigation();
    const {category}= useLocalSearchParams();
    const [businessList,setBusinessList]=useState([]);
    const [loading, setLoading]=useState(false)
    
    useEffect(()=>{
        navigation.setOptions({headerShown:true, headerTitle:category});
        getBusinessList();

    },[category])
    const getBusinessList=async()=>{
        setLoading(true);
        const q=query(collection(db,'BusinessList'),where("category","==",category))
        const querySnapshot=await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data())
            setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}]);
        })
            setLoading(false)
    }
  return (
    <View style={{flex:1}}>
        
      {businessList?.length>0 && loading==false?
      <FlatList
      data={businessList}
      onRefresh={getBusinessList}
      refreshing={loading}
      renderItem={({item,index})=>(
        <BusinessListCard
        business={item}
        key={index}
        numColumns={2}
        />
      )}/> 
    : loading?<ActivityIndicator
    style={{alignItems:'center', justifyContent:'center',flex:1}}
    size={50}
    color={Colors.PRIMARY}/>:
    <View style={{alignItems:'center', justifyContent:'center',flex:1}}>
        <Image source={require('./../../assets/images/empty.png') } style={{height:100, width:100, }}/>
    <Text style={{fontFamily:'archivo-m', fontSize: 14, color:'gray'}}>
        oops! no data uploaded
    </Text>
    </View>
    }
        </View>
  )
}