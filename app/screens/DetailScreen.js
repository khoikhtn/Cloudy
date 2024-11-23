import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  RefreshControl,
  Modal,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronLeftIcon,
  SpeakerWaveIcon,
  XCircleIcon,
} from "react-native-heroicons/solid";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "@/components/Loading";
import CustomButton from "@/components/CustomButton";
import SearchBar from "@/components/SearchBar";
import * as Speech from "expo-speech";
import { useSelector, useDispatch } from "react-redux";
import {
  addCustomPackage,
  clearCustonPackage,
  deletedFavor,
  updatedFavor,
} from "@/context/actions/user";
import * as ImagePicker from "expo-image-picker";

export default function DetailScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  const [data, setdata] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState("");
  const [audio, setAudio] = useState("");
  const packScreen = useSelector((state) => state.screenList);
  const positionFc = (element) => element.id == item.id;
  const currentIndex = packScreen.screenList.findIndex(positionFc);
  const favorList = useSelector((state) => state.favorList);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [getName, setName] = useState("");
  const [getImage, setImage] = useState("");
  const [getItem, setItem] = useState();
  const [adjust, setAdujst] = useState(false);
  const [newName, setNewName] = useState();
  const [newImage, setNewImage] = useState();
  const [collectionName, setCollectionName] = useState();

  const collections = useSelector((state) => state.favorList.customPackageList);

  const handleCustomPack = () => {
    const newCollection = {
      name: collectionName || "",
      collections: favorList.favorList,
    };
    dispatch(addCustomPackage(newCollection));
    dispatch(clearCustonPackage());
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getPackageData = async (name) => {
    const url = `https://amaranth-patient-caribou-396.mypinata.cloud/ipfs/QmT4HsaCh5HaQfruyuSfea1RhQNHhkzWcfH2BBxZTgfcMz/${name}.json`;

    const response = await fetch(url);
    const text = await response.json();

    setdata(text.itemPackage);
    setLoading(false);
  };

  const showModal = (item) => {
    setModalVisible(true);
    setName(item.Name);
    setImage(item.Image);
    setItem(item);
    setNewImage(item.Image);
    setNewName(item.Name);
  };

  const deleteItem = () => {
    dispatch(deletedFavor(getItem));
    setModalVisible(false);
  };

  const adjustButton = () => {
    const adjustItem = { Name: newName, Image: newImage };
    dispatch(updatedFavor(adjustItem));
    setAdujst(false);
    setModalVisible(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    getPackageData(item.idName);
  }, [item]);

  const getData = (item) => {
    setMessage(item.name);
    setAudio(item.audio);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        style={{
          width: wp(100),
          paddingLeft: 10,
          paddingTop: 20,
          backgroundColor: `#${item.bgColor}`,
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
          backgroundColor: `#${item.bgColor}`,
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            padding: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 32, fontWeight: "bold" }}>{item.name}</Text>
          <Image source={item.image} style={{ width: 30, height: 30 }} />
          <TouchableOpacity onPress={() => Speech.speak(item.name)}>
            <SpeakerWaveIcon size={hp(3.5)} strokeWidth={4.0} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {isLoading ? (
        <Loading style={styles.loading} />
      ) : (
        <View style={styles.mainContext}>
          <View style={styles.item_btn}>
            <SearchBar
              message={message}
              navigation={navigation}
              audio={audio}
            />
            {item.id == 1 ? (
              <TouchableOpacity
                onPress={() => navigation.navigate("AddItem", { ...item })}
                style={{
                  width: wp(85),
                  height: hp(15),
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F4F4F4",
                  marginBottom: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "grey",
                  borderStyle: "dashed",
                  flexDirection: "row",
                  marginVertical: 10,
                }}
              >
                <Image
                  source={require("@/assets/images/general/plus.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Image
                  source={require("@/assets/images/favourites/photo_placeholder.png")}
                />
              </TouchableOpacity>
            ) : (
              ""
            )}
            {
              <>
                {
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View style={styles.containerModal}>
                      <View style={styles.modalView}>
                        <View style={{ width: wp(80), alignItems: "flex-end" }}>
                          <TouchableOpacity
                            style={{ width: wp(5), height: hp(5) }}
                            onPress={() => setModalVisible(!modalVisible)}
                          >
                            <XCircleIcon style={{ color: "#8fbc8f" }} />
                          </TouchableOpacity>
                        </View>

                        {adjust ? (
                          <>
                            <TouchableOpacity onPress={() => pickImage()}>
                              <Image
                                source={{ uri: newImage }}
                                style={{
                                  width: wp(80),
                                  height: hp(40),
                                  borderRadius: 15,
                                }}
                              />
                            </TouchableOpacity>
                            <TextInput
                              style={styles.input}
                              onChangeText={(value) => setNewName(value)}
                              value={newName}
                              placeholder="Hãy điền tên mới cho Icon này"
                              keyboardType="default"
                            />
                          </>
                        ) : (
                          <>
                            <Image
                              source={{ uri: getImage }}
                              style={{
                                width: wp(80),
                                height: hp(40),
                                borderRadius: 15,
                              }}
                            />
                            <Text style={{ fontSize: 20, fontWeight: 500 }}>
                              Tittle: {getName}
                            </Text>
                          </>
                        )}
                        {adjust ? (
                          <TouchableOpacity
                            onPress={() => adjustButton()}
                            style={{
                              width: wp(30),
                              height: 20,
                              backgroundColor: "#ff7f50",
                              borderRadius: 10,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Text>Confirm change</Text>
                          </TouchableOpacity>
                        ) : (
                          <View style={styles.button_btn}>
                            <TouchableOpacity
                              style={styles.button}
                              onPress={() => deleteItem()}
                            >
                              <Text>Xóa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.button}
                              onPress={() => setAdujst(true)}
                            >
                              <Text>Chỉnh sửa</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    </View>
                  </Modal>
                }
                {item.id == 1 && (
                  <View>
                    <View style={{display: "flex", flexDirection: "row", gap: 15, flexWrap: 'wrap'}}>
                      {favorList.favorList.map((item, index) => (
                        <Animated.View
                          key={index}
                          entering={FadeInDown.delay(index * 100)
                            .duration(600)
                            .springify()
                            .damping(12)}
                        >
                          <TouchableOpacity
                            onPress={() => showModal(item)}
                            key={index}
                            style={styles.card}
                          >
                            <Image
                              style={{
                                objectFit: "contain",
                                width: wp(30),
                                height: 110,
                                borderRadius: 10,
                              }}
                              source={{ uri: item.Image }}
                            />
                          </TouchableOpacity>
                        </Animated.View>
                      ))}
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        alignItems: "flex-end",
                      }}
                    >
                      <TextInput
                        style={styles.inputSetName}
                        onChangeText={(value) => setCollectionName(value)}
                        value={newName}
                        placeholder="Set name to new collection"
                        keyboardType="default"
                      />
                      <TouchableOpacity
                        onPress={() => handleCustomPack()}
                        style={{
                          width: wp(15),
                          height: 20,
                          borderRadius: 5,
                          backgroundColor: "#ff7f50",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text>Save</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </>
            }
            {data.map((item, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(index * 100)
                  .duration(600)
                  .springify()
                  .damping(12)}
              >
                <TouchableOpacity
                  onPress={() => getData(item)}
                  key={index}
                  style={styles.card}
                >
                  <Image
                    style={{ objectFit: "contain", width: 75, height: 75 }}
                    source={{ uri: item.image }}
                  />
                  <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
          <CustomButton index={currentIndex} navigation={navigation} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainContext: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: wp(100),
    borderRadius: 20,
    backgroundColor: "white",
    gap: 15,
    marginTop: -15,
  },
  text: {
    fontSize: 14,
    fontWeight: "light",
  },
  item_btn: {
    width: wp(85),
    flexDirection: "row",
    flexWrap: "wrap",
    gap: wp(1.5),
  },
  loading: {
    marginTop: 20,
    fontSize: 50,
  },
  card: {
    width: wp(27),
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffe0",
    marginBottom: 10,
    borderRadius: 10,
    gap: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 3,
  },
  routerBtn: {
    flexDirection: "row",
    gap: 10,
    width: hp(85),
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: wp(90),
    height: hp(60),
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  containerModal: {
    width: wp(95),
    height: hp(65),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#778899",
    borderRadius: 20,
    marginHorizontal: wp(2.5),
    marginVertical: hp(21),
  },
  button_btn: {
    flexDirection: "row",
    width: wp(50),
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#5D7E86",
    width: 80,
    height: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: wp(80),
    height: hp(10),
    backgroundColor: "white",
    borderRadius: 10,
  },
  inputSetName: {
    width: wp(85),
    height: hp(5),
    paddingHorizontal: 10,
    backgroundColor: "grey",
    borderRadius: 10,
    color: "white",
  },
});
