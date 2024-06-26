import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { db } from '@/config/FirebaseConfig';
import { query, collection, getDocs } from 'firebase/firestore';
import BusinessCard from './BusinessCard';

export default function BusinessList() {
  const [businessList, setBusinessList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getBusinessList = useCallback(async () => {
    try {
      const q = query(collection(db, 'BusinessList'));
      const querySnapshot = await getDocs(q);
      const businesses = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Filter businesses with rating above 4.5
      const highRatedBusinesses = businesses.filter(business => {
        const averageRating = calculateAverageRating(business);
        return averageRating > 4.5;
      });
      
      setBusinessList(highRatedBusinesses);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    }
  }, []);

  const calculateAverageRating = (business) => {
    if (!business.reviews || business.reviews.length === 0) {
      return 0;
    }
    const totalRating = business.reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / business.reviews.length;
  };

  useEffect(() => {
    getBusinessList();
  }, [getBusinessList]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getBusinessList();
    setRefreshing(false);
  }, [getBusinessList]);

  const renderBusinessCard = useCallback(({ item }) => (
    <BusinessCard business={item} />
  ), []);

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Top Rated Businesses</Text>
      </View>
      {businessList.length > 0 ? (
        <FlatList
          data={businessList}
          renderItem={renderBusinessCard}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <Text style={styles.noBusinessText}>No top-rated businesses found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  headerText: {
    fontFamily: 'archivo-b',
    fontSize: 16,
  },
  noBusinessText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});