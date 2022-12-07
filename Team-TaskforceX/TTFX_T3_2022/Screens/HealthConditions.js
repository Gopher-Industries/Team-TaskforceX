import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Searchbar } from "react-native-paper";

const SCREENHEIGHT = Dimensions.get("window").height;
const SCREENWIDTH = Dimensions.get("window").width;

const HEALTH_DATA = [
  { id: "1", title: "None" },
  { id: "2", title: "Vitamin B6 deficiency" },
  { id: "3", title: "Vitamin D deficiency" },
  { id: "4", title: "Limit Sodium 2400mg" },
  { id: "5", title: "Limit Cholesterol 2800mg" },
  { id: "6", title: "Hypertension" },
  { id: "7", title: "Heart Disease" },
  { id: "8", title: "Diabetes type 2" },
  { id: "9", title: "Cardiovascular" },
  { id: "10", title: "Iron deficiency" },
];
export const selected_items_health=[];
const searchFilterFunction = (text) => {
  // Check if searched text is not blank
  if (text) {
    // Inserted text is not blank
    // Filter the masterDataSource and update FilteredDataSource
    const newData = HEALTH_DATA.filter(function (item) {
      // Applying filter for the inserted text in search bar
      const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredDataSource(newData);
    setSearchQuery(text);
  } else {
    // Inserted text is blank
    // Update FilteredDataSource with masterDataSource
    setFilteredDataSource(HEALTH_DATA);
    setSearchQuery(text);
  }
};

const ItemView = ({ item }) => {
  if (searchQuery.length > 0) {
    return (
      // Flat List Item
      <Text style={styles.listStyle} onPress={() => getItem(item)}>
        {item.title}
      </Text>
    );
  } else {
    return <View></View>;
  }
};

const getItem = (item) => {
  // Function for click on an item
  setHealthCondition((prevHealth) => [...prevHealth, item.id]);
  setSearchQuery("");
  // BUG: Need to hide flatlist everytime after an item is added.
};

//For troubleshooting
//console.log(health);
//console.log(searchQuery);
// console.log(item);
// console.log(isSelected)

export default function HealthConditions({ navigation }) {
  const [healthCondition, setHealthCondition] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = HEALTH_DATA.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearchQuery(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(HEALTH_DATA);
      setSearchQuery(text);
    }
  };

  const ItemView = ({ item }) => {
    if (searchQuery.length > 0) {
      return (
        // Flat List Item
        <Text style={styles.listStyle} onPress={() => getItem(item)}>
          {item.title}
        </Text>
      );
    } else {
      return <View></View>;
    }
  };

  const getItem = (item) => {
    // Function for click on an item
    setHealthCondition((prevHealthCondition) => [
      ...prevHealthCondition,
      item.id,
    ]);
    setSearchQuery("");
    // BUG: Need to hide flatlist everytime after an item is added.
  };

  //For troubleshooting
  //console.log(diet);
  console.log(searchQuery);
  // console.log(item);
  // console.log(isSelected)
  return (
    <SafeAreaView style={styles.container}>
      <Icon
        name="arrow-left"
        size={20}
        color="black"
        type="entypo"
        onPress={() => navigation.navigate("LandingPage")}
      />
      <View>
        <Text style={styles.title}>Health Conditions</Text>
      </View>
      <Searchbar
        placeholder="Search Health Conditions"
        onChangeText={(text) => searchFilterFunction(text)}
        value={searchQuery}
      />
      <View>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item) => item.id}
          renderItem={ItemView}
        />
      </View>
      <Text style={styles.text}>Added by you</Text>
      <View>
      <FlatList
        data={selected_items_health}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.preference}>
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      </View>
      <Text style={styles.text}>Most Common</Text>
      <FlatList
        data={HEALTH_DATA}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.preference}
              onPress={() => {
                //setIsSelected(!isSelected)
                if (item.title == "None") {
                  navigation.navigate('Preferences');
                  selected_items_health.splice(0,selected_items_health);
                  return;
                }
                if (selected_items_health.includes(item)) {
                  var index = selected_items_health.indexOf(item);
                  selected_items_health.splice(index, 1);
                  console.log(selected_items_health);
                }
                else {
                  selected_items_health.push(item);
                  console.log(selected_items_health);
                }

                // BUG: need to remove item.id if its already selected before
                setHealthCondition(prevHealthCondition => [...prevHealthCondition, item.id]);
                // BUG: need to change colour when selected

              }}>
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Preferences")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 30,
  },
  title: {
    fontSize: 25,
    color: "black",
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: "bold",
    color: "black",
  },

  button: {
    backgroundColor: "#8d71ad",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    top: 10,
    marginBottom: 50,
  },

  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },

  item: {
    marginTop: 10,
    // backgroundColor: 'green',
    borderColor: "black",
    borderWidth: 1,
    maxWidth: SCREENWIDTH / 2 - 40,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "space-around",
    margin: 5,
    flex: 0.5,
    //backgroundColor: 'pink',
  },
  itemText: {
    color: "black",
    // fontFamily: 'Times',
  },

  listStyle: {
    paddingTop: 10,
  },
});

// import { StatusBar } from "expo-status-bar";
// import { Button, StyleSheet, Text, View } from "react-native";

// export default function HealthConditions({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <View style={{ marginLeft: 10, marginTop: 30 }}>
//         <Text style={{ fontWeight: "bold", fontSize: 30 }}>
//           Health Conditions
//         </Text>
//       </View>
//       <Button
//         title="Continue"
//         onPress={() => navigation.navigate("Preferences")}
//       />
//       <Button title="Exit" onPress={() => navigation.navigate("LandingPage")} />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
