import React, { Component } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import firebase from "firebase";

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>DashboardScreen</Text>
        <Button
          title="Sign out"
          onPress={() =>
            firebase
              .auth()
              .signOut()
              .then(function () {
                {
                  () => this.props.navigation.navigate("Home");
                }
              })
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
