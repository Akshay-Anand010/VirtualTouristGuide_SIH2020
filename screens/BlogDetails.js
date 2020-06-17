import React, { Component } from "react";
import { Button, View, Text, ActivityIndicator } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import * as firebase from "firebase";
import { firebaseConfig } from "../config";

import Home from "./Home";
import Blog from "./Blog";
import loading from "./loading";
import new1 from "./new";

// firebase.initializeApp(firebaseConfig);

class BlogDetails extends Component {
  render() {
    return <Appnavigator />;
  }
}

const Appswitchnavigator = createSwitchNavigator({
  LoadingScreen: loading,
  DashboardScreen: Home,
  Loginscreen: new1,
});

const Appnavigator = createAppContainer(Appswitchnavigator);

export default BlogDetails;
