import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Switch,
} from "react-native";
import { isFontSizeNormal } from "../util";

import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREENHEIGHT = Dimensions.get("window").height;

const HorizontalLine = () => {
  return (<View style=
    {{

      borderBottomColor: 'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
    }
    } />)
}

// flex froggy to learn flexbox
export default function Accessibility({ navigation }) {
  const [isColorBlind, setIsColorBlind] = useState(false)
  const [isVoiceOver, setIVoiceOver] = useState(true)

  const [isTextSizeNormal, setTextSizeNormal] = useState(async () => {
    const data = await isFontSizeNormal()
    setTextSizeNormal(data) //here the state set self
  });


  async function storeTextSize() {
    await AsyncStorage.setItem("textSize", isTextSizeNormal ? "normal" : "large");
  }

  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);
  const ref9 = useRef(null);

  useEffect(() => {

    async function setupPage() {

      const normalTextElementBox = ref.current
      const largeTextElementBox = ref1.current

      storeTextSize().then().catch();

      ref4.current.setNativeProps({
        style: [styles.textSizeText, { fontSize: isTextSizeNormal ? 25 : 30 }]
      });

      ref6.current.setNativeProps({
        style: [styles.textSizeText, { fontWeight: "bold", fontSize: isTextSizeNormal ? 25 : 30 }]
      });

      ref9.current.setNativeProps({
        style: [styles.buttonText, { fontSize: isTextSizeNormal ? 18 : 22 }]
      });


      const refs1 = [ref2, ref3, ref5, ref7, ref8];
      refs1.forEach(r => {
        r.current.setNativeProps({
          style: [styles.textSizeText, { fontSize: isTextSizeNormal ? 15 : 20 }]
        });
      });


      if (isTextSizeNormal) {

        normalTextElementBox.setNativeProps(
          {
            style: styles.item1,
          }
        );

        largeTextElementBox.setNativeProps(
          {
            style: styles.item,
          }
        );

      } else {

        normalTextElementBox.setNativeProps(
          {
            style: styles.item,
          }
        );

        largeTextElementBox.setNativeProps(
          {
            style: styles.item1,
          }
        );
      }
    }

    setupPage()

  });

  return (
    <View style={styles.container}>
      <View>
        <View style={{ marginTop: 30 }}>
          <Text ref={ref4}>Accessibility</Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text ref={ref5} >The following options may make using the app easier for you</Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text ref={ref6} >Text Size</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, marginTop: 10 }}>

        <TouchableOpacity
          ref={ref}
          style={[styles.item]}
          onPress={() => setTextSizeNormal(true)} >

          <Text
            ref={ref2}
            style={styles.textSizeText}>Normal
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          ref={ref1}
          style={[styles.item]}
          onPress={() => setTextSizeNormal(false)}>

          <Text
            ref={ref3}
            style={styles.textSizeText}>Large
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <HorizontalLine />

        <View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text ref={ref7}>Colour Blind</Text>
            <Switch value={isColorBlind} onValueChange={() => { setIsColorBlind(!isColorBlind) }} />

          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text ref={ref8}>Voice Over</Text>
            <Switch value={isVoiceOver} onValueChange={() => { setIVoiceOver(!isVoiceOver) }} />

          </View>

        </View>
        <HorizontalLine />

        <TouchableOpacity
          style={[styles.button]}
          onPress={async () => {
            await storeTextSize();
            navigation.navigate("CreateAccount")
          }}
        >
          <Text ref={ref9} style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

      </View>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingStart: 10,
    paddingEnd: 10,
    backgroundColor: "#fff",
    height: SCREENHEIGHT,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  textSizeText: {
    color: "black",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#8d71ad",
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  item: {
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
    borderColor: "purple",
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "space-around",
    justifyContent: "center",
    backgroundColor: 'white',
    height: 35,
  },
  item1: {
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
    borderColor: "purple",
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "space-around",
    justifyContent: "center",
    backgroundColor: 'rgba(128,0,128,0.2)',
    height: 35,
  },
  itemText: {
    color: "black",
  },
});