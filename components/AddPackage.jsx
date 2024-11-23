import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function AddPackage({ navigation, isLogIn}) {

  return (
    <TouchableOpacity onPress={() => navigation.navigate('AddPackage', isLogIn)} style={{width: wp(85), height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', marginBottom: 10, borderRadius: 10, borderWidth: 1, borderColor: 'grey', borderStyle: 'dashed', display: "flex", flexDirection: "row", gap: 10 }}>
        <Image source={require('@/assets/images/general/plus.png')} style={{width: 60, height: 60}}/>
        <Text style={styles.text}>Thêm gói</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: '500'
      }
})