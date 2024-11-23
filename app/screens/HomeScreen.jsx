import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Categories from "@/components/Categories";
import AddPackage from "@/components/AddPackage";
import Animated, { FadeInDown } from "react-native-reanimated";
import { removeCustomPackage } from "@/context/actions/user";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const packScreen = useSelector((state) => state.screenList);
  const collections = useSelector((state) => state.favorList.customPackageList);
  const imgAccount = useSelector((state) => state.userData.image);
  const nameAccount = useSelector((state) => state.userData.name);
  const emailAccount = useSelector((state) => state.userData.email);
  const logInAccount = useSelector((state) => state.userData.currentAccount);
  const checkAccount = emailAccount == logInAccount;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        <View style={styles.header}>
          {checkAccount == true ? (
            <>
              <Text style={styles.title}>Xin chào {nameAccount}</Text>
              <View style={styles.bgAccount}>
                <Image
                  source={{ uri: imgAccount }}
                  style={{
                    width: hp(8),
                    height: hp(8),
                    borderRadius: 80,
                    objectFit: "cover",
                  }}
                />
              </View>
            </>
          ) : (
            <>
              <Text style={{ fontSize: 28, fontWeight: "bold" }}>
                Xin chào bạn
              </Text>
              <View style={styles.defaultAccount}>
                <Image source={require("@/assets/images/defaultAccount.png")} />
              </View>
            </>
          )}
        </View>
        <View style={styles.searchBar}>
          <TouchableOpacity onPress={() => updatedFavor()}></TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={setSearch}
            value={search}
            placeholder="Nhập cụm từ của bạn"
            keyboardType="default"
          />
        </View>
        <View style={styles.item_btn}>
          {packScreen.screenList.map((items, id) => (
            <Categories
              key={id}
              item={items}
              index={id}
              navigation={navigation}
            />
          ))}
          {collections &&
            collections.map((item, index) => (
              <Animated.View
                entering={FadeInDown.delay(index * 100)
                  .duration(600)
                  .springify()
                  .damping(12)}
              >
                <Pressable
                  key={index}
                  onPress={() =>
                    navigation.navigate("NewCollection", { ...item})
                  }
                  style={{
                    width: wp(85),
                    height: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "violet",
                    marginBottom: 10,
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <Image
                    source={require("@/assets/images/hedis_logo.png")}
                    style={{ width: 60, height: 60, objectFit: "contain" }}
                  />
                  <Text style={styles.text}>{item.name}</Text>
                </Pressable>
                <Pressable style={{position: "absolute", top: 5, right: 10, padding: 10, borderRadius: 10, backgroundColor: 'white'}} onPress={() => dispatch(removeCustomPackage(item))}>
                  <Text style={{color: "red", fontWeight: 800}}>X</Text>
                </Pressable>
              </Animated.View>
            ))}
          <AddPackage navigation={navigation} isLogIn={checkAccount} />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("FlashCard")}
        style={styles.box}
      >
        <Image
          source={require("@/assets/images/book.png")}
          style={{
            width: hp(4),
            height: hp(4),
            borderRadius: 80,
            objectFit: "cover",
          }}
        />
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
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp(85),
    marginVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    width: 200,
  },
  bgAccount: {
    flexDirection: "row",
    width: 60,
    height: 60,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
  },
  searchBar: {
    height: 40,
    width: wp(85),
    gap: 5,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  input: {
    width: wp(60),
    padding: 10,
    backgroundColor: "white",
    color: "grey",
  },
  item_btn: {
    width: wp(85),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 40,
    gap: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "light",
  },
  box: {
    position: "absolute",
    bottom: 20,
    right: 30,
    backgroundColor: "steelblue",
    borderRadius: 50,
    width: wp(15),
    height: hp(5),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  defaultAccount: {
    flexDirection: "row",
    width: 60,
    height: 60,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0095D3",
    shadowColor: "black",
  },
});
