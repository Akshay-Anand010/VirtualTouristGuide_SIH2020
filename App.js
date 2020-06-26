import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as firebase from "firebase";
import { firebaseConfig } from "./config";
import Icon from "react-native-vector-icons/Ionicons";

import Login from "./screens/login";
import signup from "./screens/signup";
import TabNavigator from "./screens/Blog";
import loading from "./screens/loading";
import Home from "./screens/Home";
import camera from "./screens/camera";
import App1 from "./screens/drawer";
import Details from "./screens/Details";
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
    drawer: {
      screen: App1,
      headerMode: "none",
      navigationOptions: {
        header: null,
        headerVisible: false,
        headerLeft: null,
      },
    },
    Blog: {
      screen: TabNavigator,

      navigationOptions: ({ navigate, navigation }) => ({
        title: "Virtual Tourist Guide",
        headerLeft: null,
        backgroundColor: "#000",
        headerTintColor: "#ffcc00",
        headerStyle: {
          backgroundColor: "#000",
        },
        // headerRight: () => (

        //   <Button
        //     onPress={() => {
        //       navigation.navigate("camera");
        //     }}
        //     title="Info"
        //     color="#000"
        //     style={styles.btn}
        //   />
        // ),
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
    loading: {
      screen: loading,
    },
    Details:{
      screen:Details
    },
    profile: {
      screen: Home,
    },
    camera: {
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
