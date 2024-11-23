import { Text,
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    Button, 
    TouchableHighlight, TextInput, TouchableOpacity} from 'react-native'
  import React, { useEffect, useState } from 'react'
  import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { useNavigation } from "@react-navigation/native";
  import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
  import { useDispatch, useSelector } from 'react-redux';
  import { updatedName } from '@/context/actions/user';

export default function NameScreen() {

  const navigation = useNavigation();
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  const ring1padding = useSharedValue(0);
  useEffect(()=>{
    ring1padding.value = 0;
    setTimeout(()=> ring1padding.value = withSpring(ring1padding.value+hp(5)), 300);
},[])

const createName  = () => {
  dispatch(updatedName(name))
  navigation.navigate('SetAccountAvatar')
}


  return (
    <View style={styles.container}>
      <Animated.View style={{padding: ring1padding}}>
        <Image
          style={{width: hp(45), height: hp(45)}}
          source={require('@/assets/images/hedis_logo.png')}
        />
      </Animated.View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Name"
          keyboardType="email-address"
        />
      </View>
      <TouchableOpacity style={styles.button_btn}  onPress={() => createName()}>
        <Text style={styles.textButton}>Next</Text>
      </TouchableOpacity>
      <View style={styles.bottom}>
            <Text style={styles.header}>Tạo một hồ sơ!</Text>
            <Text style={styles.paragraph}>Chọn tên hồ sơ hoặc cho chúng tôi biết tên của người sử dụng ứng dụng này.</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#BE97E6',
      },
      input: {
        height: 40,
        width: wp(80),
        margin: 6,
        borderWidth: 1,
        padding: 10,
        borderRadius: 40, 
        backgroundColor: 'white',
        color: 'grey'
      },
      button_btn: {
        backgroundColor: "#fff",
        paddingVertical: hp(1.5),
        paddingHorizontal: hp(5),
        borderRadius: hp(3.5),
        marginVertical: 5
      },
      textButton: {
        color: "black",
        fontSize: hp(2.2),
        fontWeight: "bold",
      }, 
      bottom: {
        width: wp(80)
      },
      header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        marginTop: 20
      },
      paragraph: {
        fontSize: 16,
        fontWeight: 'light',
        textAlign: 'center',
        color: 'white'
      },
})