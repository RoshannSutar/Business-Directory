import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet, Alert, ToastAndroid, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from 'expo-router';
import placeholderImage from './../../assets/images/addimage.png';
import { collection, getDocs, query, setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

const addBusiness = () => {
  const { user } = useUser();
  const [categoryList, setCategoryList] = useState([]);
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [businessName, setBusinessName] = useState('');
  const [businessCategory, setBusinessCategory] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [about, setAbout] = useState('');
  const [contact, setContact] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add New Business',
      headerShown: true
    });
    getCategoryList();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, 'Category'));
    const snapShot = await getDocs(q);
  
    snapShot.forEach((doc) => {
      setCategoryList(prev => [...prev, {
        label: doc.data().name,
        value: doc.data().name
      }]);
    });
  };

  const handleContactChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setContact(numericValue);
  };

  const onAddNewBusiness = async () => {
    setLoading(true);
    if (!businessName || !businessCategory || !businessAddress || !contact) {
      Alert.alert("Missing Information", "Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (!image) {
      Alert.alert("Missing Image", "Please select an image for the business");
      setLoading(false);
      return;
    }

    const filename = Date.now().toString() + ".jpg";
    const resp = await fetch(image);
    const blob = await resp.blob();

    const imageRef = ref(storage, "business-app/" + filename);
    uploadBytes(imageRef, blob)
      .then((snapshot) => {
        console.log("File uploaded successfully");
        return getDownloadURL(imageRef);
      })
      .then(async (downloadURL) => {
        await saveBusinessDetail(downloadURL);
        clearForm();
      })
      .catch((error) => {
        console.error("Error in business creation process:", error);
        Alert.alert("Error", "Failed to add business. Please try again.");
      });
  };

  const saveBusinessDetail = async (imageUrl) => {
    await setDoc(doc(db, 'BusinessList', Date.now().toString()), {
      name: businessName,
      address: businessAddress,
      contact: contact,
      about: about,
      category: businessCategory,
      website: websiteLink,
      username: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      imageUrl: imageUrl
    });
    setLoading(false);
    ToastAndroid.show('New Business Added', ToastAndroid.BOTTOM);
  };

  const clearForm = () => {
    setImage(null);
    setBusinessName('');
    setBusinessCategory('');
    setBusinessAddress('');
    setAbout('');
    setContact('');
    setWebsiteLink('');
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Image 
          source={image ? { uri: image } : placeholderImage} 
          style={styles.image} 
          resizeMode="cover"
        />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Business Name"
        value={businessName}
        onChangeText={setBusinessName}
      />

      <View style={styles.pickerContainer}>
        <RNPickerSelect 
          onValueChange={(value) => setBusinessCategory(value)}
          items={categoryList}
          value={businessCategory}
          placeholder={{ label: "Select a category", value: null }}
          style={pickerSelectStyles}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Business Address"
        value={businessAddress}
        onChangeText={setBusinessAddress}
      />

      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="About"
        value={about}
        onChangeText={setAbout}
        multiline
        numberOfLines={4}
      />

      <TextInput
        style={styles.input}
        placeholder="Contact"
        value={contact}
        onChangeText={handleContactChange}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Website Link (Optional)"
        value={websiteLink}
        onChangeText={setWebsiteLink}
        keyboardType="url"
      />

      <TouchableOpacity
        disabled={loading} style={styles.button} onPress={onAddNewBusiness}>
        {loading ? <ActivityIndicator size={'medium'} color={'#fff'} /> :
          <Text style={styles.buttonText}>Submit</Text>}
      </TouchableOpacity>

      <View style={{ height: 50 }}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'white'
  },
  imagePicker: {
    width: 100,
    height: 100,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  input: {
    borderBottomWidth:1,
    borderBottomColor:'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderBottomWidth:1,
    borderBottomColor:'gray',
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

export default addBusiness;