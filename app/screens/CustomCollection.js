import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomItem, updateCustomItem } from "@/context/actions/user";
import SearchBar from "@/components/SearchBar";
import * as Speech from "expo-speech";

export default function CustomCollection(props) {
  const item = props.route.params;
  const collections = useSelector((state) => state.favorList.customPackageList);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [adjust, setAdujst] = useState(false);
  const [newName, setNewName] = useState();
  const [newImage, setNewImage] = useState();
  const [getName, setName] = useState("");
  const [getImage, setImage] = useState("");
  const [collection, setCollection] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [index, setIndex] = useState();
  const [message, setMessage] = useState("");
  const [openAddModal, setOpenModal] = useState(false);
  const [url, setURL] = useState(null);
  const [nameItem, setNameItem] = useState("");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const showModal = (item, i) => {
    setModalVisible(true);
    setName(item.Name);
    setImage(item.Image);
    setNewImage(item.Image);
    setNewName(item.Name);
    setCollection(item);
    setIndex(i);
  };

  const deleteItem = () => {
    let x;
    collections.map((collection, i) =>
      item.name === collection.name ? (x = i) : null
    );
    const newCollections = collections[x].collections.filter(
      (item) => item !== collection
    );
    const newCustom = collections;
    newCustom[x].collections = newCollections;
    dispatch(deleteCustomItem(newCustom));
    setModalVisible(false);
    navigation.goBack();
  };

  const adjustButton = () => {
    let x;
    collections.map((collection, i) =>
      item.name === collection.name ? (x = i) : null
    );
    const newCustom = collections;
    newCustom[x].collections[index].Name = newName;
    newCustom[x].collections[index].Image = newImage;

    dispatch(updateCustomItem(newCustom));
    setAdujst(false);
    setModalVisible(false);
    navigation.goBack();
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

  const addImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setURL(result.assets[0].uri);
    }
  };

  const addItem = () => {
    let x;
    collections.map((collection, i) =>
      item.name === collection.name ? (x = i) : null
    );
    const newCustom = collections;
    const newItem = { Name: nameItem, Image: url };
    newCustom[x].collections.push(newItem);

    console.log("check", newItem, newCustom);
    // dispatch(updateCustomItem(newCustom));
    setOpenModal(false);
    // navigation.goBack();
  };

  const addMessage = () => {
    setMessage(newName)
    setModalVisible(false)
  }
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
          backgroundColor: "violet",
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
          backgroundColor: "violet",
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
          <Image
            source={require("@/assets/images/cloudy_logo.png")}
            style={{ width: 40, height: 30 }}
          />
          <TouchableOpacity onPress={() => Speech.speak(item.name)}>
            <SpeakerWaveIcon size={hp(3.5)} strokeWidth={4.0} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {item.collections.length > 0 ? (
        <View style={styles.mainContext}>
          <View style={styles.item_btn}>
            <SearchBar message={message} style={{ paddingBottom: 10 }} />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 7,
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {item &&
                item.collections.map((item, index) => (
                  <Animated.View
                    key={index}
                    entering={FadeInDown.delay(index * 100)
                      .duration(600)
                      .springify()
                      .damping(12)}
                  >
                    <TouchableOpacity
                      onPress={() => showModal(item, index)}
                      key={index}
                      style={styles.card}
                    >
                      <Image
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "80%",
                          borderRadius: 10,
                        }}
                        source={{ uri: item.Image }}
                      />
                      <Text>{item.Name}</Text>
                    </TouchableOpacity>
                  </Animated.View>
                ))}
            </View>
          </View>
        </View>
      ) : null}
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => setOpenModal(true)}
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
      </View>
      {/* Add Item */}
      {
        <Modal
          animationType="slide"
          transparent={true}
          visible={openAddModal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!openAddModal);
          }}
        >
          <View style={styles.containerModal}>
            <View style={{ width: wp(80), alignItems: "flex-end" }}>
              <TouchableOpacity
                style={{ width: wp(5), height: hp(5) }}
                onPress={() => setOpenModal(!openAddModal)}
              >
                <XCircleIcon style={{ color: "#8fbc8f" }} />
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity
                onPress={() => addImage()}
                style={{
                  width: wp(85),
                  height: hp(30),
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F4F4F4",
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderWidth: 1,
                  borderColor: "grey",
                  borderStyle: "dashed",
                  flexDirection: "row",
                }}
              >
                {url ? (
                  <Image
                    source={{ uri: url }}
                    style={{
                      width: wp(85),
                      height: hp(30),
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      borderWidth: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                ) : (
                  <>
                    <Image
                      source={require("@/assets/images/general/plus.png")}
                      style={{ width: 20, height: 20 }}
                    />
                    <Image
                      source={require("@/assets/images/favourites/photo_placeholder.png")}
                    />
                  </>
                )}
              </TouchableOpacity>
              <View
                style={{
                  width: wp(85),
                  height: hp(25),
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#E8E8E8",
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderWidth: 1,
                  borderColor: "grey",
                  borderStyle: "dashed",
                  gap: 5,
                  borderTopWidth: 0,
                }}
              >
                <Text style={{ color: "black", fontSize: 18, width: wp(80) }}>
                  Ghi chú:
                </Text>
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
              <TouchableOpacity style={styles.button} onPress={() => addItem()}>
                <Text style={{ color: "white" }}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      }
      {/* Detail */}
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
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => addMessage()}
                  >
                    <Text>Tạo câu</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>
      }
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
    height: 115,
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
    height: hp(70),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#778899",
    borderRadius: 20,
    marginHorizontal: wp(2.5),
    marginVertical: hp(21),
    paddingTop: 20
  },
  button_btn: {
    flexDirection: "row",
    width: wp(50),
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    gap: 10,
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
