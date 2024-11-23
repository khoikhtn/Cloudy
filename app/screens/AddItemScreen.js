import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon} from 'react-native-heroicons/solid';
import Animated, { FadeIn } from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux';
import { updatedFavor } from '@/context/actions/user';

const AddItemScreen = (props) => {

  const [nameItem, setNameItem] = useState('');
  const item = props.route.params;
  const [image, setImage] = useState(null)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const favorList = useSelector(state => state.favorList)


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const newItem = {Name: nameItem, Image: image}

  const createItem = () => {
    setNameItem('')
    setImage(null)
    dispatch(updatedFavor(newItem))
  }
  
  return (
 <View style={styles.container}>
    <Animated.View entering={FadeIn.delay(200).duration(1000)} style={{width: wp(100), paddingLeft: 10, paddingTop: 20, backgroundColor: `#${item.bgColor}`}}>
          <TouchableOpacity onPress={()=> navigation.goBack()}>
              <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="black" />
          </TouchableOpacity>
    </Animated.View>
    <View style={{ justifyContent: 'flex-end',  width: wp(100), height: hp(15), backgroundColor: `#${item.bgColor}`, padding: 20}}>
            <Text style={{fontSize: 32, fontWeight: 'bold'}}>Tạo bộ sưu tập</Text>
    </View>
    <View style={styles.mainContext}>
        <View style={{marginVertical: 15}}>
            <TouchableOpacity onPress={() => pickImage()} style={{width: wp(85), height: hp(30), justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F4F4', borderTopLeftRadius: 10, borderTopRightRadius: 10, borderWidth: 1, borderColor: 'grey', borderStyle: 'dashed', flexDirection: 'row'}}>
              {
                image 
                ? <Image source={{uri : image}} style={{width: wp(85), height: hp(30),  borderTopLeftRadius: 10, borderTopRightRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}/>
                :
                <>
                <Image source={require('@/assets/images/general/plus.png')} style={{width: 20, height: 20}}/>
                <Image source={require('@/assets/images/favourites/photo_placeholder.png')}/>
                </>
              }
            </TouchableOpacity>
            <View style={{width: wp(85), height: hp(25), justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8E8E8', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderWidth: 1, borderColor: 'grey', borderStyle: 'dashed', gap: 5, borderTopWidth: 0}}>
              <Text style={{color: 'black', fontSize: 18, width: wp(80)}}>Ghi chú:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => setNameItem(value)}
                value={nameItem}
                placeholder="Hãy điền tên của Icon này"
                keyboardType="default"
              />
            </View>
        </View>
        <View>
        <TouchableOpacity style={styles.button} onPress={() => createItem()}>
            <Text style={{ color: 'white'}}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </View>
</View>
  )
}



export default AddItemScreen

const styles = StyleSheet.create({
  mainContext: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: wp(100),
    borderRadius: 20,
    backgroundColor: 'white',
    gap: 15,
    marginTop: -15,
    paddingVertical: 20
  },   
  item_btn: {
    width: wp(85),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#5D7E86",
    width: 50,
    height: 30,
    borderRadius: 30, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: wp(80),
    height: hp(18),
    backgroundColor: 'white'
  }
})