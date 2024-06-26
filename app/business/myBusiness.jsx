import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { useNavigation } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import MyBusinessCard from '@/components/Profile/MyBusinessCard'

export default function MyBusiness() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [businessList, setBusinessList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'My Businesses',
      headerShown: true
    });
    if (user) {
      getUserBusiness();
    }
  }, [user]);

  const getUserBusiness = async () => {
    setLoading(true)
    setBusinessList([]);
    const q = query(collection(db, "BusinessList"), where("userEmail", "==", user?.primaryEmailAddress?.emailAddress));
    const querySnapshot = await getDocs(q);
    const businesses = [];
    querySnapshot.forEach((doc) => {
      businesses.push({ id: doc.id, ...doc.data() });
    });
    setBusinessList(businesses);
    setLoading(false)
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getUserBusiness();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList 
          data={businessList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MyBusinessCard
              business={item}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No businesses found</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyText: {
    fontSize: 18,
    color: '#777',
  },
});