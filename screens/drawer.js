import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { DrawerActions } from "react-navigation-drawer";
import Icon from "react-native-vector-icons/Ionicons";
import TabNavigator from "./Blog";
import camera from "./camera";
const HomeScreen = () => (
  <View style={styles.container}>
    <Text>Home Screen!</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.container}>
    <Text>Profile Screen!</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={styles.container}>
    <Text>Settings Screen!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  menuOpen: {
    marginLeft: 14,
    marginTop: 10,
    color: "#fff",
  },
  menuClose: {
    marginLeft: 14,
    marginTop: 10,
    color: "#fff",
  },
});

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions: ({ navigation }) => ({
      drawerIcon: () => <Ionicons name="ios-home" size={20} />,

      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("camera");
          }}
        >
          <Icon
            style={[{ color: "#fff", marginRight: 10 }]}
            size={35}
            name={"ios-camera"}
          />
        </TouchableOpacity>
      ),
    }),
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Profile Screen",
      drawerLabel: "Profile",
      drawerIcon: () => <Ionicons name="ios-person" size={20} />,
    }),
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      drawerIcon: () => <Ionicons name="ios-settings" size={20} />,
    }),
  },
});

const StackNavigator = createStackNavigator({
  DrawerNavigator: {
    screen: DrawerNavigator,

    navigationOptions: ({ navigation }) => {
      const { state } = navigation;

      if (state.isDrawerOpen) {
        return {
          title: "Virtual Tourist Guide",
          backgroundColor: "#000",
          headerTintColor: "#ffcc00",
          headerStyle: {
            backgroundColor: "#000",
          },
          headerLeft: ({ titleStyle }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            >
              <Ionicons
                name="ios-close"
                style={styles.menuClose}
                size={36}
                color={titleStyle}
              />
            </TouchableOpacity>
          ),
          headerRight: (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("camera");
              }}
            >
              <Icon
                style={[{ color: "#fff", marginRight: 10 }]}
                size={35}
                name={"ios-camera"}
              />
            </TouchableOpacity>
          ),
        };
      } else {
        return {
          title: "Virtual Tourist Guide",
          backgroundColor: "#000",
          headerTintColor: "#ffcc00",
          headerStyle: {
            backgroundColor: "#000",
          },
          headerLeft: ({ titleStyle }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            >
              <Ionicons
                name="ios-menu"
                style={styles.menuOpen}
                size={32}
                color={titleStyle}
              />
            </TouchableOpacity>
          ),
          headerRight: (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("camera");
              }}
            >
              <Icon
                style={[{ color: "#fff", marginRight: 10 }]}
                size={35}
                name={"ios-camera"}
              />
            </TouchableOpacity>
          ),
        };
      }
    },
  },
  camera: {
    screen: camera,
  },
});

export default App1 = createAppContainer(StackNavigator);
