import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { DrawerActions } from "react-navigation-drawer";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/AntDesign";
import TabNavigator from "./Blog";
import profile from "./profile";
import * as firebase from "firebase";
import { firebaseConfig } from "../config";
import Login from "./login";
import chatbot from "./chatbot";
import Home from "./Home";

// firebase.initializeApp(firebaseConfig);

export default class App1 extends React.Component {
  componentDidMount = () => {
    global.s2 = "";
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      var s1, s2;
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
        s1 = profile.displayName;
        s2 = profile.photoURL;
      });
      global.s2 = s2;
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, paddingBottom: 0, marginBottom: 0 }}>
        <AppContainer />
      </SafeAreaView>
    );
  }
}

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
  image: {
    width: 30,
    height: 30,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 2,
    borderRadius: 15,
    marginRight: 10,
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
            navigation.navigate("profile");
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
    screen: profile,
    navigationOptions: ({ navigation }) => ({
      title: "Profile Screen",
      drawerLabel: "Profile",
      drawerIcon: () => <Ionicons name="ios-person" size={20} />,
    }),
  },
  Settings: {
    screen: chatbot,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: "Assistant",
      drawerIcon: () => <Ionicons name="ios-chatbubbles" size={20} />,
    }),
  },
  share: {
    screen: chatbot,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: "share App",
      drawerIcon: () => <Icon1 name="sharealt" size={20} />,
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
                navigation.navigate("profile");
              }}
            >
              <Image
                style={styles.image}
                source={global.s2 ? { uri: global.s2 } : null}
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
                navigation.navigate("profile");
              }}
            >
              <Image
                style={styles.image}
                source={global.s2 ? { uri: global.s2 } : null}
              />
            </TouchableOpacity>
          ),
        };
      }
    },
  },
  profile: {
    screen: profile,
  },
});

const AppContainer = createAppContainer(StackNavigator);
