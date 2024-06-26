import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Category from '@/components/Home/Category';
import { getDocs, query, collection } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import ExploreBusinessList from '@/components/Explore/ExploreBusinessList';
import SearchBox from '@/components/Explore/SearchBox';

export default function Explore() {
  const router = useRouter();
  const [businessList, setBusinessList] = useState([]);
  const [filteredBusinessList, setFilteredBusinessList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchBusinessList = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'BusinessList'));
      const querySnapshot = await getDocs(q);
      const businesses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBusinessList(businesses);
      setFilteredBusinessList(businesses);
    } catch (error) {
      console.error("Error fetching businesses:", error);
      // Optionally, show an error message to the user
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBusinessList();
  }, [fetchBusinessList]);

  useEffect(() => {
    filterBusinessList();
  }, [searchQuery, selectedCategory, businessList]);

  const filterBusinessList = useCallback(() => {
    let filteredList = businessList;

    if (searchQuery) {
      filteredList = filteredList.filter(business =>
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredList = filteredList.filter(business =>
        business.category === selectedCategory
      );
    }

    setFilteredBusinessList(filteredList);
  }, [searchQuery, selectedCategory, businessList]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchBusinessList();
    setRefreshing(false);
  }, [fetchBusinessList]);

  const handleCategorySelect = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Explore</Text>
      </View>
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Category
        explore={true}
        onCategorySelect={handleCategorySelect}
      />
      <ExploreBusinessList 
        businessList={filteredBusinessList} 
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: Colors.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 40,
  },
  headerText: {
    fontFamily: 'archivo-b',
    fontSize: 24,
    color: 'white',
    marginLeft: 10,
  },
});