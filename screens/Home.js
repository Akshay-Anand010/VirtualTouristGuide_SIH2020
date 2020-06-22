import React, { Component, useReducer } from "react";
import { Button, View, Text, StyleSheet, Image } from "react-native";
import firebase from "firebase";
import LoginPage from "./login";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      photoUrl: "",
      loading: false,
      disabled: false,
      signedIn: false,
    };
  }

  componentDidMount = () => {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      var s1, s2;
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
        s1 = profile.displayName;
        s2 = profile.photoURL;
      });
      this.setState({
        name: s1,
        photoUrl: s2,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.name}</Text>
        <Image style={styles.image} source={{ uri: this.state.photoUrl }} />
        <Button
          title="Sign out"
          onPress={() =>
            firebase
              .auth()
              .signOut()
              .then(function () {
                {
                  () => this.navigation.navigate("Home");
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
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150,
  },
});

export default Home;
