import { View, Text, FlatList, Image } from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';
import { db } from '@/config/FirebaseConfig';
import { query, collection, getDocs } from 'firebase/firestore';
import CategoryItem from './CategoryItem';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function Category({ explore = false, onCategorySelect }) {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, 'Category'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCategoryList((prev) => [...prev, doc.data()]);
    });
  };

  const onCategoryPressHandler = (item) => {
    if (!explore) {
      router.push('/businesslist/' + item.name);
    }
    if (onCategorySelect) {
      onCategorySelect(item.name);
    }
  };

  return (
    <View style={{backgroundColor:Colors.SECONDARYBG ,padding: 8, marginLeft: 15, marginRight: 15, borderRadius: 20 }}>
      {!explore && (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between', marginBottom: 20 }}>
          <Text style={{ fontFamily: 'archivo-b', fontSize: 16 }}>Categories</Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: Colors.PRIMARY }}>View all</Text>
            <Ionicons name="arrow-forward" size={20} color={Colors.PRIMARY} />
          </View>
        </View>
      )}
      <FlatList
        data={categoryList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <CategoryItem 
            category={item} 
            key={index} 
            onCategoryPress={(category) => onCategoryPressHandler(item)} 
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
