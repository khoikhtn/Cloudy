import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/solid'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { useSelector } from 'react-redux';


export default function CustomButton({index, navigation}) {
  const packScreen = useSelector((state) => state.screenList)
  const lengthPackScreen = packScreen.screenList.length

  return (
    <View style={styles.routerBtn}>
    {
      <>
        {
          index > 0 && (
            <TouchableOpacity  onPress={() =>
                navigation.navigate('DetailPackage', {...packScreen.screenList[index - 1]})}
              style={{width: 160, height: 40, borderRadius: 20, flexDirection: 'row', gap: 5, backgroundColor:`#${packScreen.screenList[index - 1].bgColor}`, justifyContent: 'center', alignItems: 'center' }}>
                <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
                <Image style={{objectFit: 'contain',  width: 30, height: 30}} source={packScreen.screenList[index - 1].image}/>
                <Text style={styles.text}>{packScreen.screenList[index - 1].name}</Text>
            </TouchableOpacity>
          )
        }
        {
          index < lengthPackScreen - 1 && (
            <TouchableOpacity  onPress={() =>
                  navigation.navigate('DetailPackage', {...packScreen.screenList[index + 1]})}
                style={{width: 160, height: 40, borderRadius: 20, flexDirection: 'row', gap: 5, backgroundColor:`#${packScreen.screenList[index + 1].bgColor}`, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.text}>{packScreen.screenList[index + 1].name}</Text>
                  <Image style={{objectFit: 'contain', width: 30, height: 30}} source={packScreen.screenList[index + 1].image}/>
                  <ChevronRightIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
              </TouchableOpacity>
          )
        }
      </>
    }
  </View>
  )
}

const styles = StyleSheet.create({
  routerBtn: {
    flexDirection: 'row',
    gap: 10,
    width: hp(85),
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    fontWeight: 'light'
  }
})