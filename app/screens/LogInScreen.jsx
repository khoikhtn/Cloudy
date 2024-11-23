import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Button,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { FIREBASE_AUTH } from "../../firebase-config";
import { updatedCurrentAccount } from "../../context/actions/user";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LogInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      dispatch(updatedCurrentAccount(email));
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const ring1padding = useSharedValue(0);
  useEffect(() => {
    ring1padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      300
    );
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ padding: ring1padding }}>
        <Image
          style={{ width: hp(45), height: hp(45) }}
          source={require("@/assets/images/hedis_logo.png")}
        />
      </Animated.View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="false"
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(pass) => setPass(pass)}
          value={password}
          placeholder="Password"
          keyboardType="default"
          autoCapitalize="none"
          autoComplete="false"
        />
      </View>
      <TouchableOpacity style={styles.button_btn} onPress={() => signIn()}>
        <Text style={styles.textButton}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button_btn2}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.textButton2}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#BE97E6",
    width: wp(100),
    height: hp(100),
    overflow: 'hidden'
  },
  input: {
    height: 40,
    width: wp(80),
    margin: 6,
    borderWidth: 1,
    padding: 10,
    borderRadius: 40,
    backgroundColor: "white",
    color: "grey",
  },
  button_btn: {
    backgroundColor: "#fff",
    paddingVertical: hp(1.5),
    paddingHorizontal: hp(5),
    borderRadius: hp(3.5),
    marginVertical: 5,
  },
  textButton: {
    color: "black",
    fontSize: hp(2.2),
    fontWeight: "bold",
  },
  button_btn2: {
    paddingVertical: hp(1.5),
    paddingHorizontal: hp(5),
    borderRadius: hp(3.5),
    marginVertical: 5,
  },
  textButton2: {
    fontSize: hp(2.2),
    fontWeight: "medium",
    color: "white",
  },
});
