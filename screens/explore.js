import React, { Component } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import firebase from "firebase";

class explore extends Component {
  render() {
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default explore;
