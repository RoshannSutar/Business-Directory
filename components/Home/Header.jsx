import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useUser, useAuth } from '@clerk/clerk-expo';
import { Colors } from './../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Header() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

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

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.userInfo}>
          <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
          <View style={styles.userTextContainer}>
            <Text style={styles.greetingText}>Hello,</Text>
            <Text style={styles.userNameText}>{user?.fullName}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <MaterialIcons name="logout" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 20,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    marginRight: 10,
  },
  userTextContainer: {
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 15,
    fontFamily: 'archivo-b',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  userNameText: {
    fontSize: 18,
    fontFamily: 'archivo-b',
    color: '#fff',
  },
  logoutButton: {
    padding: 5,
  },
});
