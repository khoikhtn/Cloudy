import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from "@react-navigation/native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    } from "react-native-responsive-screen";

export default function Back() {
    const navigation = useNavigation()
  return (
    <Animated.View entering={FadeIn.delay(200).duration(1000)} style={{width: 50, height: 30, marginTop: 20}}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
            <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="black" />
        </TouchableOpacity>
    </Animated.View>   
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        backgroundColor: 'white',
      },
})