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
import firebase from "firebase";

class comment extends Component<{}> {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      comment: "",
      photoUrl: "",
      loading: false,
      disabled: false,
    };
  }

  componentDidMount = () => {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      var s1, s2, s3;
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
        s1 = profile.displayName;
        s2 = profile.photoURL;
        s3 = profile.email;
      });
      this.setState({
        name: s1,
        photoUrl: s2,
        email: s3,
      });
    }
  };

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

          password: this.state.password,
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
        <Text style={styles.ty}>Share your experience ...</Text>
        <View style={styles.old}>
          <Image style={styles.image} source={{ uri: this.state.photoUrl }} />
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="Your comments"
            style={styles.textInput}
            onChangeText={(text) => this.setState({ comment: text })}
          />
        </View>

        <TouchableOpacity
          disabled={this.state.disabled}
          activeOpacity={0.8}
          style={styles.Btn}
          onPress={this.saveData}
        >
          <Text style={styles.btnText}>Comment</Text>
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
  old: {
    flexDirection: "row",
  },
  textInput: {
    height: 300,
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
  image: {
    width: 50,
    height: 50,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150,
  },
});

export default comment;
