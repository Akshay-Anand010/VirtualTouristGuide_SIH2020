import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import * as Google from "expo-google-app-auth";

class new1 extends Component {
  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behaviour: "web",
        androidClientId:
          "132030559274-4r21rmb54hdjbi2ddf6kjlklrig0u6vj.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home screen</Text>
        <Button
          title="Sign in with Google"
          onPress={() => this.signInWithGoogleAsync()}
        />
      </View>
    );
  }
}

export default new1;
