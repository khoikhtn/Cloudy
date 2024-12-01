import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { accountImage } from '@/constants/subject'
import Animated, { FadeInDown, useSharedValue, withSpring } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { ActivityIndicator } from 'react-native';
  import { useDispatch, useSelector } from 'react-redux';
  import { updatedImage } from '@/context/actions/user';

export default function AccountScreen() {

  const navigation = useNavigation();
  const [accImage, setAccImage] = useState('')
  const [isSelected, setSelected] = useState()
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const dispatch = useDispatch()
 

  const ring1padding = useSharedValue(0);
  useEffect(()=>{
    ring1padding.value = 0;
    setTimeout(()=> ring1padding.value = withSpring(ring1padding.value+hp(5)), 300);
},[])

const selectImage = (item) =>{
  setSelected(item.id)
  setAccImage(item.image)
}


const getImageData = async() => {
  const url = 'https://amaranth-patient-caribou-396.mypinata.cloud/ipfs/QmNbvUya3nY1vr7TZTgqZypVMcghUouM4E5FHt2WUdLt7Z';
  
  const response = await fetch(url);
  const text = await response.json();
  
  setData(text.accountImage)
  setLoading(false)    
};

useEffect(() => {
  getImageData()
},[])

const selectImageAccount = () => {
    dispatch(updatedImage(accImage))
    navigation.navigate('LogIn')
}


  return (
    <View style={styles.container}>
      <View style={styles.top}>
          <Text style={styles.header}>Chọn một hình đại diện!</Text>
          <Text style={styles.paragraph}>Chọn một hình đại diện cho người sẽ sử dụng ứng dụng Cloudy này.</Text>
      </View>
      <View  style={styles.image_btn}>
          {
            isLoading 
            ?
             <ActivityIndicator size="large" color="#000ff"/>
            :
              data.map((item, id) => (
                <Animated.View key={id} entering={FadeInDown.delay(id*100).duration(600).springify().damping(12)}>  
                  <TouchableOpacity onPress={() => selectImage(item)}  style={ isSelected == item.id ? styles.hoverStyle : styles.imageBox}>
                        <Image
                          style={isSelected == item.id ? styles.hoverImage : styles.image}
                          source={{uri : item.image}}
                        />
                  </TouchableOpacity>
              </Animated.View>  
              ))
          }
      </View>
      <TouchableOpacity style={styles.button_btn}  onPress={() => selectImageAccount()}>
        <Text style={styles.textButton}>Next</Text>
      </TouchableOpacity>
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
  top: {
    width: wp(70)
  },
  header: {
    fontSize: 26,
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
  image_btn: {
    flexDirection: 'row',
    width: wp(95),
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 20
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
  imageBox:{
    width: wp(30), 
    height: hp(15), 
  },
  hoverStyle: {
    padding: 5,
    backgroundColor: '#ff7f50',
    borderRadius: 80,
  },
  hoverImage: {
    width: hp(15) - 10, 
    height: hp(15) - 10
  },
  image: {
    width: hp(15), height: hp(15)
  }
})