import { StyleSheet, Text,Pressable, Image } from 'react-native'
import React from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Categories({item, index, navigation}) {
  return (
    <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
      <Pressable key={index} onPress={() => navigation.navigate('DetailPackage', {...item})} style={{width: wp(85), height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor:`#${item.bgColor}`, marginBottom: 10, borderRadius: 10 , display: "flex", flexDirection: "row", gap: 10}}>
        <Image source={item.image} style={{width: 60, height: 60, objectFit: 'contain'}}/>
        <Text style={styles.text}>{item.name}</Text>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'light',
  }
})