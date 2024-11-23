import { Text,
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    Button, 
    TouchableHighlight,
    TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

export default function WelcomeScreen({ navigation }) {
//   const navigation = useNavigation();

  const ring1padding = useSharedValue(0);
  useEffect(()=>{
    ring1padding.value = 0;
    setTimeout(()=> ring1padding.value = withSpring(ring1padding.value+hp(5)), 300);
},[])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Chào mừng bạn đến</Text>
      <Text style={styles.logoTitle}>Cloudy</Text>
      <Text style={styles.paragraph}>
        Cảm ơn bạn đã tải xuống Cloudy, hãy bắt đầu thiết lập hồ sơ Cloudy của
        bạn
      </Text>
      <Animated.View style={{padding: ring1padding}}>
        <Image
          style={{width: hp(40), height: hp(40)}}
          source={require('../../assets/images/hedis_logo.png')}
        />
      </Animated.View>
      <View >
        <TouchableOpacity  style={{
            backgroundColor: "#fff",
            paddingVertical: hp(1.5),
            paddingHorizontal: hp(5),
            borderRadius: hp(3.5),
          }}
          onPress={() => navigation.navigate("LogIn")}>
          <Text style={{
              color: "black",
              fontSize: hp(2.2),
              fontWeight: "medium",
            }}>Bắt đầu</Text>
        </TouchableOpacity>
      </View>
      <Text style= {styles.paragraph2}>By signing in you accept our Terms of Use and Privacy Policy</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#BE97E6',
        width: wp(100),
        height: hp(100),
        overflow: 'hidden'
      },
      header: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
      },
      logoTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        padding: 5,
      },
      paragraph: {
        fontSize: 16,
        fontWeight: 'medium',
        textAlign: 'center',
        color: 'white'
      },
      button_btn: {
        width: 100,
        height: 40,
        borderRadius: 50,
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        display:"flex" 
      },
      textButton: {
        fontWeight: '700',
        display: 'flex',
        width: 50,
        height: 40
      },
      paragraph2: {
        fontSize: 16,
        fontWeight: 'medium',
        textAlign: 'center',
        color: 'white',
        padding: 10
      }

})