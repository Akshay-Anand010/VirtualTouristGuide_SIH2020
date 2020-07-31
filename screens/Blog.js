import React, { Component } from "react";

import {
  View,
  SafeAreaView,
  StyleSheet,
  Button,
  ScrollView,
  FlatList,
  Alert,
  Text,
  Image,
  Linking,
} from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Ionicons";
import Dashboard from "./BlogDetails";
import Home from "./Home";
import Maps from "./maps";
import explore from "./explore";
import chatbot from "./explore";
import camera from "./camera";

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Dashboard,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={"ios-home"} />
          </View>
        ),
        backgroundColor: "#000",
      },
    },
    explore: {
      screen: explore,
      navigationOptions: {
        tabBarLabel: "explore",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon1 style={[{ color: tintColor }]} size={25} name={"explore"} />
          </View>
        ),
      },
    },

    Maps: {
      screen: Maps,
      navigationOptions: {
        tabBarLabel: "maps",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={"ios-map"} />
          </View>
        ),
      },
    },

    camera: {
      screen: camera,
      navigationOptions: {
        tabBarLabel: "camera",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon2
              style={[{ color: tintColor }]}
              size={27}
              name={"ios-camera"}
            />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: "Home",
    activeColor: "#00cc44",
    inactiveColor: "#c2c2a3",
    barStyle: { backgroundColor: "#fff" },
  }
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 10,
    padding: 20,
    marginBottom: 50,
    backgroundColor: "#ffffff",
    flexGrow: 1,
  },
  cm: {
    marginBottom: 50,
    marginTop: 20,
  },
  cont: {
    flex: 1,

    marginTop: 10,
    textAlign: "center",
  },
  te: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "sans-serif-thin",
  },
  img: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 340,
    height: 180,
    marginBottom: 5,
    marginTop: 10,
  },
  TextStyle: {
    color: "#E91E63",
    textDecorationLine: "underline",
    fontStyle: "normal",
  },
  new: {
    height: 300,
    padding: 10,
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#ebebe0",
    borderRadius: 5,
    borderColor: "#ccccb3",
    borderWidth: 5,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default createAppContainer(TabNavigator);
