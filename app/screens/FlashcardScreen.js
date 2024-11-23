import {
  Pressable,
  ScrollView,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SpeakerWaveIcon,
} from "react-native-heroicons/solid";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { flashcard } from "@/constants/flashcard";
import * as Speech from "expo-speech";
import FlipCard from "react-native-flip-card";

export default function FlashcardScreen() {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    if (index >= 0 && index < 15) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  const preImage = () => {
    if (index > 0 && index <= 15) {
      setIndex(index - 1);
    } else {
      setIndex(15);
    }
  };

  const speak = () => {
    if (index >= 0 && index <= 15) {
      Speech.speak(flashcard[index].name);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        style={{
          width: wp(100),
          paddingLeft: 10,
          paddingTop: 20,
          backgroundColor: "#8de06f",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="black" />
        </TouchableOpacity>
      </Animated.View>
      <View
        style={{
          justifyContent: "flex-end",
          width: wp(100),
          height: hp(15),
          backgroundColor: "#8de06f",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>Flash card</Text>
      </View>
      <View style={styles.mainContext}>
        <View style={styles.box}>
          <FlipCard onPress={() => speak()}>
            <Image
              source={flashcard[index].image}
              style={{ width: wp(25), height: hp(20), borderRadius: 10 }}
            />
            <View
              style={{
                width: wp(25),
                height: hp(20),
                borderRadius: 10,
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{size: "24", fontWeight: "600"}}>{flashcard[index].name}</Text>
            </View>
          </FlipCard>
        </View>
        <View style={styles.button_btn}>
          <TouchableOpacity style={styles.preButton} onPress={() => preImage()}>
            <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="black" />
            <Text>Trước</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => nextImage()}
          >
            <Text>Sau</Text>
            <ChevronRightIcon size={hp(3.5)} strokeWidth={4.5} color="black" />
          </TouchableOpacity>
        </View>
        <Image
          style={{ width: hp(40), height: hp(40) }}
          source={require("@/assets/images/hedis_logo.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContext: {
    alignItems: "center",
    justifyContent: "center",
    width: wp(100),
    borderRadius: 20,
    backgroundColor: "#b2acf9",
    gap: 15,
    marginTop: -15,
    paddingVertical: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#b2acf9",
    alignItems: "center",
  },
  box: {
    width: wp(85),
    height: hp(25),
    backgroundColor: "#eee8aa",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    paddingVertical: 10
  },
  button_btn: {
    flexDirection: "row",
    width: wp(85),
    justifyContent: "space-between",
    marginBottom: 30,
  },
  nextButton: {
    width: wp(40),
    height: wp(10),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    backgroundColor: "#dc5c65",
    borderRadius: 10,
  },
  preButton: {
    width: wp(40),
    height: wp(10),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    backgroundColor: "#f59da3",
    borderRadius: 10,
  },
});
