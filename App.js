import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as firebase from "firebase";
import { firebaseConfig } from "./config";

import Login from "./screens/login";
import signup from "./screens/signup";
import TabNavigator from "./screens/Blog";
import loading from "./screens/loading";
import Home from "./screens/Home";

// firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Login,
      navigationOptions: {
        headerLeft: null,
        title: "Virtual Tourist Guide",
        backgroundColor: "#3385ff",
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#3385ff",
        },
        headerTitleAlign: "center",
        headerTitleStyle: {},
      },
    },
    Signup: {
      screen: signup,
    },
    Blog: {
      screen: TabNavigator,

      navigationOptions: {
        title: "Virtual Tourist Guide",
        headerLeft: null,
        backgroundColor: "#000",
        headerTintColor: "#ffcc00",
        headerStyle: {
          backgroundColor: "#000",
        },
        headerRight: () => (
          <Button
            onPress={() => alert("This is a button!")}
            title="Info"
            color="#000"
            style={styles.btn}
          />
        ),
      },
    },
    loading: {
      screen: loading,
    },
    profile: {
      screen: Home,
    },
  },
  {
    initialRouteName: "loading",
  }
);

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    marginRight: 10,
  },
});
