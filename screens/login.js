import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  createSwitchNavigator,
  Button,
} from "react-native";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";

class Login extends Component<{}> {
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = (googleUser) => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              console.log("user signed in ");
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now(),
                  })
                  .then(function (snapshot) {
                    // console.log('Snapshot', snapshot);
                  });
              } else {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .update({
                    last_logged_in: Date.now(),
                  });
              }
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    );
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behaviour: "web",
        androidClientId:
          "132030559274-4r21rmb54hdjbi2ddf6kjlklrig0u6vj.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        // return result.accessToken;
        this.onSignIn(result);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      loading: false,
      disabled: false,
    };
  }

  saveData = () => {
    this.setState({ loading: true, disabled: true }, () => {
      fetch("http://docbook.orgfree.com/login.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == "Wrong Credentials") alert(responseJson);
          else if (responseJson != "Wrong Credentials")
            this.props.navigation.navigate("Blog");
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
        <Text style={styles.ty}>Get in Now!</Text>

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
          onChangeText={(text) => this.setState({ password: text })}
        />

        <TouchableOpacity
          disabled={this.state.disabled}
          activeOpacity={0.8}
          style={styles.Btn}
          onPress={this.saveData}
        >
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <Text>
          Not joined yet ?
          <Text
            style={styles.url}
            onPress={() => this.props.navigation.navigate("Signup")}
          >
            Sign up now
          </Text>
        </Text>

        {this.state.loading ? (
          <ActivityIndicator size="large" style={styles.actv} />
        ) : null}
        <Text style={styles.boun}>or</Text>
        <View>
          <Button
            title="Sign in with Google"
            onPress={() => this.signInWithGoogleAsync()}
          />
        </View>
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
    fontSize: 40,
    color: "black",
  },
  url: {
    color: "#1a53ff",
    textDecorationLine: "underline",
  },
  actv: {
    marginBottom: 5,
  },
  boun: {
    marginBottom: 5,
  },
});

export default Login;
