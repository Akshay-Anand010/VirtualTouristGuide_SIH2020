import React, { Component } from "react";
import { Button, View, Text, ActivityIndicator } from "react-native";
import * as firebase from "firebase";

class loading extends Component {
  componentDidMount() {
    this.checkifloggedin();
  }

  checkifloggedin = () => {
    firebase.auth().onAuthStateChanged(
      function (user) {
        if (user) {
          this.props.navigation.navigate("drawer");
        } else {
          this.props.navigation.navigate("Home");
        }
      }.bind(this)
    );
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default loading;
