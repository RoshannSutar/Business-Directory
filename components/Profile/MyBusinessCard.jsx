import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ToastAndroid } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';

export default function BusinessListCard({ business }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    Alert.alert(
      'Delete Permanently?',
      'Are you sure you want to delete this business?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteBusiness(),
        },
      ]
    );
  };

  const deleteBusiness = async () => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'BusinessList', business?.id));
      ToastAndroid.show('Business Deleted!', ToastAndroid.LONG);
    } catch (error) {
      console.error('Error deleting business: ', error);
      ToastAndroid.show('Failed to delete business.', ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View>
        <Image source={{ uri: business.imageUrl }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{business.name}</Text>
            <Text style={styles.address}>{business.address}</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => router.push("/businessdetail/" + business?.id)}>
              <Fontisto name="preview" size={24} color='#006A4E' />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} disabled={loading}>
              <FontAwesome name="trash" size={30} color={loading ? '#ccc' : '#C41E3A'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontFamily: 'archivo-b',
    fontSize: 22,
  },
  address: {
    fontFamily: 'archivo-b',
    fontSize: 15,
    color: 'gray',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
});
