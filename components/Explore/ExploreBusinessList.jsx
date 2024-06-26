import React, { useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import BusinessListCard from './BusinessListCard';

export default function ExploreBusinessList({ businessList, onRefresh }) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh(); // Assuming onRefresh is a prop function to refresh the business list
    setRefreshing(false);
  };

  return (
    <View>
      <FlatList
        data={businessList}
        renderItem={({ item }) => (
          <BusinessListCard
            key={item.id} // Assuming `id` is unique
            business={item}
          />
        )}
        keyExtractor={(item) => item.id.toString()} // Ensure a unique key
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
}
