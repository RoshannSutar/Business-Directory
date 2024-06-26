import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Share, Alert } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';

export default function Menu() {
  const MenuList = [
    {
      id: 1,
      name: "Add Business",
      icon: require('./../../assets/images/addbusiness.png'),
      path: '/business/addBusiness'
    },
    {
      id: 2,
      name: "My Business",
      icon: require('./../../assets/images/mybusiness.png'),
      path: '/business/myBusiness'
    },
    {
      id: 3,
      name: "Share",
      icon: require('./../../assets/images/share1.png'),
      path: ''
    },
    {
      id: 4,
      name: "Logout",
      icon: require('./../../assets/images/logout.png'),
      path: ''
    },
  ];
  
  const router = useRouter();
  const { signOut } = useAuth();

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this awesome app!',
      });
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while sharing.');
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await signOut();
              router.replace('/login');
            } catch (error) {
              Alert.alert('Error', 'Failed to sign out.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleMenuPress = (item) => {
    switch(item.name) {
      case "Share":
        handleShare();
        break;
      case "Logout":
        handleLogout();
        break;
      default:
        router.push(item.path);
    }
  };

  return (
    <View style={styles.container}>
      {MenuList.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.menuItem}
          onPress={() => handleMenuPress(item)}
        >
          <Image source={item.icon} style={styles.menuIcon} />
          <Text style={styles.menuText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
      <View style={{display:'flex', alignItems:'flex-end', marginTop:'10%'}}>
      <Text style={{
        fontFamily:'archivo',
        fontSize: 12,
        color:'gray'
      }}>
        Developed by Roshan @2024
      </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 20,
    elevation: 5, // for Android
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 20,
  },
  menuText: {
    fontFamily: 'archivo-m',
    fontSize: 16,
    color: Colors.PRIMARY,
  },
});
