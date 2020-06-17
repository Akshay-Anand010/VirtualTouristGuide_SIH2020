import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";

class Login extends Component<{}> {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      phone_number: "",
      loading: false,
      disabled: false,
    };
  }

  saveData = () => {
    this.setState({ loading: true, disabled: true }, () => {
      fetch("http://docbook.orgfree.com/submit.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.name,

          email: this.state.email,
          phone_number: this.state.phone_number,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          alert(responseJson);
          this.setState({ loading: false, disabled: false });
        })
        .catch((error) => {
          console.error(error);
          this.setState({ loading: false, disabled: false });
        });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.ty}>Join our Community...</Text>

        <TextInput
          underlineColorAndroid="transparent"
          placeholder="Email"
          style={styles.textInput}
          onChangeText={(text) => this.setState({ email: text })}
        />

        <TextInput
          underlineColorAndroid="transparent"
          placeholder="Password"
          style={styles.textInput}
          onChangeText={(text) => this.setState({ phone_number: text })}
        />

        <TouchableOpacity
          disabled={this.state.disabled}
          activeOpacity={0.8}
          style={styles.Btn}
          onPress={this.saveData}
        >
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        {this.state.loading ? <ActivityIndicator size="large" /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    paddingHorizontal: 25,
    paddingTop: Platform.OS == "ios" ? 20 : 0,
  },

  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "grey",
    marginVertical: 5,
    alignSelf: "stretch",
    padding: 8,
    fontSize: 16,
  },

  Btn: {
    backgroundColor: "rgba(0,0,0,0.6)",
    alignSelf: "stretch",
    padding: 10,
    marginTop: 10,
    marginBottom: 25,
  },

  btnText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },

  ty: {
    fontSize: 50,
    color: "red",
  },
});

export default Login;
