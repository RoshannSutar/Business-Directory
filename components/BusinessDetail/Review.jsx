import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Image, ScrollView } from 'react-native';
import { Rating } from 'react-native-ratings';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useUser } from '@clerk/clerk-expo';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';

export default function Review({ business }) {
    const { user } = useUser();
    const [rating, setRating] = useState(0);
    const [userInput, setUserInput] = useState('');

    const onSubmit = async () => {
        try {
            const docRef = doc(db, 'BusinessList', business?.id);
            await updateDoc(docRef, {
                reviews: arrayUnion({
                    rating: rating,
                    comment: userInput,
                    userName: user?.fullName,
                    userImage: user?.imageUrl,
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                }),
            });
            ToastAndroid.show('Comment added successfully!', ToastAndroid.SHORT);
            setUserInput(''); // Clear the input after submission
        } catch (error) {
            ToastAndroid.show('Failed to add comment.', ToastAndroid.SHORT);
            console.error('Error adding review: ', error);
        }
    };

    return (
        <ScrollView style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
            <Text style={{ fontFamily: 'archivo-b', fontSize: 18, color: 'gray' }}>Review</Text>
            <View>
                <Rating
                    showRating={false}
                    onFinishRating={(rating) => setRating(rating)}
                    style={{ paddingVertical: 10 }}
                />
                <View style={{ marginLeft: 5, marginRight: 5, marginTop: 5, flexDirection: 'row', gap: 2 }}>
                    <View
                        style={{
                            backgroundColor: '#f0f8ff',
                            borderRadius: 10,
                            width: '85%',
                            padding: 5,
                            borderWidth: 1,
                            borderColor: Colors.PRIMARY,
                        }}
                    >
                        <TextInput
                            onChangeText={(value) => setUserInput(value)}
                            value={userInput}
                            placeholder="Write your review"
                            numberOfLines={2}
                            style={{ textAlignVertical: 'top' }}
                        />
                    </View>
                    <TouchableOpacity
                        disabled={!userInput}
                        onPress={onSubmit}
                        style={{ flex: 1, alignItems: 'flex-end', padding: 5 }}
                    >
                        <Ionicons name="send" size={30} color={Colors.PRIMARY} />
                    </TouchableOpacity>
                </View>
                {/* Display Previous Reviews */}
                <View style={{ marginTop: 15, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: Colors.PRIMARY }}>
                    {business?.reviews?.map((item, index) => (
                        <View key={index} style={{ marginBottom: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                <Image source={{ uri: item.userImage }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                                <Text style={{ fontFamily: 'archivo-b', fontSize: 16, marginLeft: 10 }}>{item.userName}</Text>
                            </View>
                            <Rating
                                imageSize={15}
                                readonly
                                startingValue={item.rating} // Display the rating from the review
                                style={{ paddingVertical: 5, marginLeft: 40 }}
                            />
                            <Text style={{ fontFamily: 'archivo', fontSize: 14, marginLeft: 40 }}>{item.comment}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}
