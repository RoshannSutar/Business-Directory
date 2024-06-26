import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Sliders from '../../components/Home/Sliders'
import Category from '../../components/Home/Category'
import BusinessList from '../../components/Home/BusinessList'


export default function home() {
  return (
    <ScrollView style={{backgroundColor:'white'}}>
      {/* Header section */}
      <Header/>

      {/* Category */}
      <Category/>

      {/* Slider section */}
      <Sliders/>
      
      {/* Most Rated Business */}
      <BusinessList/>
      
    </ScrollView>
  )
}