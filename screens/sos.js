import React from "react";
import { Text, View, StyleSheet, Button, Linking } from "react-native";
import call from "react-native-phone-call";
export default class sos extends React.Component {
  call = () => {
    //handler to make a call
    const args = {
      number: "112 ",
      prompt: false,
    };
    call(args).catch(console.error);
  };
  call1 = () => {
    //handler to make a call
    const args = {
      number: "0832-2424001/ 02/ 03",
      prompt: false,
    };
    call1(args).catch(console.error);
  };
  call2 = () => {
    //handler to make a call
    const args = {
      number: "1091",
      prompt: false,
    };
    call2(args).catch(console.error);
  };
  call3 = () => {
    //handler to make a call
    const args = {
      number: "	112",
      prompt: false,
    };
    call3(args).catch(console.error);
  };
  call4 = () => {
    //handler to make a call
    const args = {
      number: "101",
      prompt: false,
    };
    call4(args).catch(console.error);
  };
  call5 = () => {
    //handler to make a call
    const args = {
      number: "108",
      prompt: false,
    };
    this.call5(args).catch(console.error);
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.t1}>EMERGENCY CONTACTS</Text>
        <Text style={styles.t2}>GOA POLICE</Text>
        <Button title="Make a Call" onPress={this.call} />
        <Text style={styles.t2}>Goa Tourism Development Corporation Ltd</Text>
        <Button title="Make a Call" onPress={this.call1} />
        <Text style={styles.t2}>Women Helpline Number</Text>
        <Button title="Make a Call" onPress={this.call2} />
        <Text style={styles.t2}>Centralized Helpline Number</Text>
        <Button title="Make a Call" onPress={this.call3} />
        <Text style={styles.t2}>Fire</Text>
        <Button title="Make a Call" onPress={this.call4} />
        <Text style={styles.t2}>Ambulance</Text>
        <Button title="Make a Call" onPress={this.call5} />
        <Text style={styles.last}>
          To know more please visit{" "}
          <Text
            style={styles.inner}
            onPress={() => Linking.openURL("https://indianhelpline.com/GOA/")}
          >
            here
          </Text>
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  last: {
    marginTop: 10,
    fontSize: 20,
    color: "grey",
  },
  inner: {
    color: "red",
    textDecorationLine: "underline",
  },
  t1: {
    color: "red",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
  },
  t2: {
    color: "grey",
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "bold",
  },
});
