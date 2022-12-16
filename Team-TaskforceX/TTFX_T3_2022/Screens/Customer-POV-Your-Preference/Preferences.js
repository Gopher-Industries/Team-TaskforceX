import { useState } from 'react';
import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { selected_items_diet } from './DietryRequirements';
import { selected_items_allergy } from './Allergies';
import { selected_items_dislikes } from './Dislikes';
import { selected_items_health } from './HealthConditions';

// const SCREENHEIGHT = Dimensions.get('window').height;
const SCREENWIDTH = Dimensions.get('window').width;
const DIET_DATA = selected_items_diet;
const ALLERGY_DATA = selected_items_allergy;
const DISLIKES_DATA = selected_items_dislikes;
const HEALTH_DATA = selected_items_health;

const CloseImageButton = () => {
  return (
    <Image source={require('../assets/close.png')}
      style={{ width: 23, height: 23 }}
    />
  )
}


export default function Preferences({ navigation }) {
  const [diet, setDiet] = useState(DIET_DATA);
  const [allergy, setAllergy] = useState(ALLERGY_DATA);
  const [dislikes, setDislikes] = useState(DISLIKES_DATA);
  const [health, setHealth] = useState(HEALTH_DATA);

  const deleteDietItem = itemId => {
    setDiet(diet => {
      return diet.filter(goal => goal.id !== itemId);
    });
  };

  const deleteAlleryItem = itemId => {
    setAllergy(allergy => {
      return allergy.filter(goal => goal.id !== itemId);
    });
  };

  const deleteDisLikesItem = itemId => {
    setDislikes(dislikes => {
      return dislikes.filter(goal => goal.id !== itemId);
    });
  };

  const deleteHealthItem = itemId => {
    setHealth(health => {
      return health.filter(goal => goal.id !== itemId);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Icon
        name="arrow-left"
        size={20}
        color="black"
        type="entypo"
        onPress={() => navigation.goBack()}
      />
      <View>
        <Text style={styles.title}>Your preferences</Text>
      </View>
      <View>
        <Text style={styles.text}>Please confirm your selections</Text>
      </View>
      <View>

        <Text style={styles.preference}>Special dietary requirement</Text>

        <FlatList
          data={diet}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>

              <Text style={styles.itemText}>{item.title}
              </Text>
              <TouchableOpacity
                onPress={() => deleteDietItem(item.id)}
                style={{ marginStart: 10 }}>
                <CloseImageButton />
              </TouchableOpacity>
            </View>
          )} />

        <Text style={styles.preference}>Allergies</Text>
        <FlatList
          data={allergy}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>

              <Text style={styles.itemText}>{item.title}
              </Text>
              <TouchableOpacity
                onPress={() => deleteAlleryItem(item.id)}
                style={{ marginStart: 10 }}>
                <CloseImageButton />
              </TouchableOpacity>
            </View>
          )} />

        <Text style={styles.preference}>Dislikes</Text>
        <FlatList
          data={dislikes}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>

              <Text style={styles.itemText}>{item.title}
              </Text>
              <TouchableOpacity
                onPress={() => deleteDisLikesItem(item.id)}
                style={{ marginStart: 10 }}>
                <CloseImageButton />
              </TouchableOpacity>
            </View>
          )} />
        <Text style={styles.preference}>Health Conditions</Text>
        <FlatList
          data={health}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>

              <Text style={styles.itemText}>{item.title}
              </Text>
              <TouchableOpacity
                onPress={() => deleteHealthItem(item.id)}
                style={{ marginStart: 10 }}>
                <CloseImageButton />
              </TouchableOpacity>
            </View>
          )} />
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('NutritionalReport')}
            accessibilityLabel="Confirm your preference selection">
            <Text style={styles.buttonText}>Confirm Choices</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.altButton}
            onPress={() => navigation.navigate('DietryRequirements')}
            accessibilityLabel="Redo your preference selection">
            <Text style={styles.altButtonText}>Redo</Text>
          </TouchableOpacity>
        </View></View>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    fontSize: 150,
    textAlign: 'left',
  },
  title: {
    fontSize: 25,
    color: 'black',
    marginBottom: 20,
    backgroundColor: 'white',
    marginTop: 20,
    // paddingBottom: 10,
  },
  text: {
    fontSize: 15,
    marginBottom: 10,
  },
  preference: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttons: {
    marginBottom: 50
    //  display: "flex"
  },
  button: {
    backgroundColor: '#8d71ad',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    width: SCREENWIDTH * 0.8,
    top: 10,
  },

  altButton: {
    backgroundColor: 'white',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'gray',
    width: SCREENWIDTH * 0.8,
    marginTop: 20,
  },

  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },

  altButtonText: {
    fontSize: 18,
    color: '#8d71ad',
    fontWeight: 'bold',
    top: 0,
    alignSelf: 'center',
    padding: 10,
  },

  item: {
    marginTop: 10,
    backgroundColor: 'rgba(128,0,128,0.2)',
    borderColor: 'black',
    borderWidth: 1,
    maxWidth: SCREENWIDTH / 2 - 40,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    alignContent: "center",
    minHeight: 50,
    borderRadius: 10,
    justifyContent: 'center',
    margin: 5,
    flex: 0.5,
    display: "flex",
    flexDirection: "row"
  },

  itemText: {
    color: 'black',
  },
});
