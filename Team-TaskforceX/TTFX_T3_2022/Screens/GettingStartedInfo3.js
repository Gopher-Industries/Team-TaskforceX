import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const SCREENHEIGHT = Dimensions.get("window").height;
const SCREENWIDTH = Dimensions.get("window").width;

export default function GettingStartedInfo3({ navigation }) {
  return (
    <SafeAreaView style={styles.gettingStartedThree}>
      <ImageBackground
        source={require("../assets/images/Splash3.png")}
        style={styles.image}
      >
        <Icon //Back arrow
          style={styles.backArrow}
          name="arrow-left"
          size={20}
          color="black"
          type="entypo"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            We'll keep your family or carer up to date with your nutrional health
          </Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#8273A9" }]}
            // //testing for now, go to Confirm Screen
              onPress={() => navigation.navigate("Accessibility")}
            >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gettingStartedThree: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  //Back arrow
  backArrow: {
    top: 60,
    left: 16,
  },

  textContainer: {
    width: SCREENWIDTH,
    height: SCREENHEIGHT - SCREENHEIGHT / 3,
    backgroundColor: "transparent",
    marginTop: SCREENHEIGHT / 3,
  },

  // Description
  text: {
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    color: "black",
    justifyContent: "center",
    padding: 20,
    paddingLeft: 25,
    paddingRight: 25,
    textAlign: "center",
    top: 315,
    letterSpacing: -0.2,
    lineHeight: 24,
  },

  //Continue button
  button: { 
    backgroundColor: "#8273A9",
    width: "90%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 100,
    top: 325,
  },

 //Continue button text
  buttonText: {
    fontSize: 16,
    letterSpacing: 0.1,
    lineHeight: 20,
    fontWeight: '700',
    fontFamily: 'OpenSans_400Regular',
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

