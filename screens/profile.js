import React, { Component } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import firebase from "firebase";
import showdata from "./login";

class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }

  componentDidMount() {
    const data = this.props.navigation.getParam("data", "some default value");
    this.setState({
      data,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.data}</Text>
        <View>{showdata}</View>
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

export default profile;
