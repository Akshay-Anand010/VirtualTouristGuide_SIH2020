import React, { Component } from "react";
import { Button, View, Text } from "react-native";

class camera extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home screen</Text>
        <Button title="Sign in with Google" />
      </View>
    );
  }
}

export default camera;
