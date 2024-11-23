import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  SpeakerWaveIcon,
  XCircleIcon,
  TrashIcon,
} from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Speech from "expo-speech";

export default function SearchBar({ message }) {
  const [speech, setSpeech] = useState("");

  useEffect(() => {
    setSpeech(speech + message.toLowerCase() + " ");
  }, [message]);

  const backSearch = () => {
    setSpeech(speech.slice(0, speech.length - message.length - 1));
  };

  const resetSearch = () => {
    setSpeech("");
  };

  return (
    <View style={{display: "flex", flexDirection: "column", alignItems: "flex-end", paddingBottom: 5,}}>
      <View style={styles.searchBar}>
        <Text style={styles.textSearch}>{speech}</Text>
      </View>
      <View style={{display: "flex", gap: 5, width: wp(40), flexDirection: "row", justifyContent: "flex-end"}}>
        <TouchableOpacity
          style={styles.backgoundXIcon}
          onPress={() => backSearch()}
        >
          <XCircleIcon size={hp(3.5)} strokeWidth={4.0} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backgoundTrashIcon}
          onPress={() => resetSearch()}
        >
          <TrashIcon size={hp(3.5)} strokeWidth={4.0} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backgoundSpeakerIcon}
          onPress={() => Speech.speak(speech)}
        >
          <SpeakerWaveIcon size={hp(3.5)} strokeWidth={4.0} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    width: wp(85),
    height: hp(8),
    paddingHorizontal: 10,
    backgroundColor: "#D9D9D9",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    marginVertical: 20,
  },
  textSearch: {
    width: wp(85),
    color: "white",
    fontWeight: "600",
  },
  backgoundXIcon: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#DDAA08",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  backgoundTrashIcon: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#E24141",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  backgoundSpeakerIcon: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#23C55E",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
