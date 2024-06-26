import { View, Text, FlatList, Image, Linking, TouchableOpacity, Share, Alert } from 'react-native';
import React from 'react';

export default function ActionButton({ business }) {
  const actionButtonMenu = [
    {
      id: 1,
      name: 'call',
      icon: require('./../../assets/images/phone-call.png'),
      url: 'tel:' + business?.contact,
    },
    {
      id: 2,
      name: 'location',
      icon: require('./../../assets/images/pin.png'),
      url: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(business?.address),
    },
    {
      id: 3,
      name: 'web',
      icon: require('./../../assets/images/internet.png'),
      url: business?.website,
    },
    {
      id: 4,
      name: 'share',
      icon: require('./../../assets/images/share.png'),
      url: '', // URL is not needed for the share action
    },
  ];

  const openPressHandle = async (item) => {
    if (item.name === 'share') {
      try {
        await Share.share({
          message: `${business?.name}\nAddress: ${business?.address}`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else if (item.name === 'web') {
      if (item.url) {
        Linking.openURL(item.url).catch((err) => {
          console.error('An error occurred', err);
        });
      } else {
        Alert.alert('Website Not Available', 'Website link is not available for this business.');
      }
    } else {
      if (item.url) {
        Linking.openURL(item.url).catch((err) => {
          console.error('An error occurred', err);
        });
      } else {
        console.error('Invalid URL');
      }
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        data={actionButtonMenu}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: 'space-evenly' }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openPressHandle(item)} style={{ alignItems: 'center' }}>
            <Image source={item.icon} style={{ height: 50, width: 50 }} />
            <Text style={{ fontFamily: 'archivo-m', textAlign: 'center' }}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
