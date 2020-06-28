import React, { Component } from "react";
import { Dropdown } from "react-native-material-dropdown";
import ProgressBar from "react-native-progress/Bar";
import { Dimensions, SafeAreaView, ScrollView } from "react-native";
import firebase from "firebase";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  FlatList,
  TextInput,
} from "react-native";
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      email: "",
      comments: "",
      name: "",
      photoUrl: "",
      dataSource: [],
      dataSource1: [],
      loading: false,
      disabled: false,
    };
  }

  saveData = (mid1) => {
    global.mid1 = mid1;
    console.log(global.comment);
    var p = global.comment;
    fetch("http://docbook.orgfree.com/comment.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,

        email: this.state.email,

        comments: p,

        photourl: this.state.photoUrl,

        mid: global.mid1,
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
  };

  renderCategories() {
    return this.state.dataSource.map((item, index) => (
      <Text key={index} style={styles.nearby}>
        {index}:{item}
      </Text>
    ));
  }

  componentDidMount() {
    global.comment = "";
    global.mid1 = "";
    global.m = "";
    const data = this.props.navigation.getParam("data", {});
    this.setState({
      data,
    });

    global.m = this.state.data.Mid;

    var lat = "";
    var lon = "";

    lat = data.latitude;
    lon = data.longitude;

    var url = `https://datapredictor.herokuapp.com/latlong?lati=15.5494&longi=73.7535`;
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": "my token",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
        if (responseJson) {
          console.log(this.state.dataSource);
        } else if (responseJson.error) {
          // Alert.alert(responseJson.error);
        }
      })

      .catch((error) => {
        console.error(error);
      });

    setTimeout(() => {
      fetch("http://docbook.orgfree.com/comm.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mid: this.state.data.Mid,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            dataSource1: responseJson,
          });
          if (responseJson) {
            console.log(this.state.dataSource1);
            console.log(this.state.data.Mid);
          } else if (responseJson.error) {
            // Alert.alert(responseJson.error);
          }
        })

        .catch((error) => {
          console.error(error);
        });
    }, 1000);

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
        email: s3,
        photoUrl: s2,
      });
    }
  }
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          margin: 5,
          marginTop: 10,
          marginBottom: 10,
          backgroundColor: "#fff",
        }}
      />
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.Main}>
            <Text style={styles.heading}>{this.state.data.name}</Text>
            <Image
              style={styles.imageStyle}
              source={{
                uri: this.state.data.image,
              }}
            />

            <View style={styles.Container}>
              <View>
                <Text style={styles.location}>{this.state.data.Location}</Text>
              </View>
            </View>
            <View style={styles.Description}>
              <Text style={styles.te}>{this.state.data.Description}</Text>
            </View>
            <View style={styles.temp}></View>

            <Text style={styles.heading}>Nearby places</Text>

            <View style={styles.container}>{this.renderCategories()}</View>
          </View>
          <Text style={styles.con}>Share your Experience</Text>

          <View style={styles.comment}>
            <Image style={styles.image} source={{ uri: this.state.photoUrl }} />
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Share your experience"
              style={styles.textInput}
              onChangeText={(text) => (global.comment = text)}
            />
          </View>
          <View style={styles.b2}>
            <Button
              style={styles.b1}
              title="Comment"
              onPress={() => this.saveData(this.state.data.Mid)}
            />
          </View>
          <Text style={styles.con1}>Comments from your fellow Tourists..</Text>
          <FlatList
            data={this.state.dataSource1}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({ item }) => (
              <View style={styles.flatview}>
                <View style={styles.hr}>
                  <Image
                    style={styles.image1}
                    source={{
                      uri: item.photourl,
                    }}
                  />
                  <Text style={styles.sm}>{item.name}</Text>
                </View>
                <View style={styles.vr}>
                  <Text style={styles.tr}>{item.comments}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Main: {
    width: Dimensions.get("window").width,
    backgroundColor: "#333",
  },
  b1: {
    color: "#fff",
    width: 100,
  },
  tr: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 45,
  },
  image1: {
    width: 30,
    height: 30,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 2,
    borderRadius: 15,
    marginRight: 10,
  },
  sm: {
    fontSize: 20,
    color: "#FEE715FF",
    fontWeight: "bold",
  },
  hr: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
  vr: {
    flexDirection: "column",
    marginHorizontal: 20,
    alignItems: "flex-start",
  },
  b2: {
    width: 200,
    marginHorizontal: 85,
  },
  con: {
    color: "#ffc400",
    marginHorizontal: 15,
    marginTop: 3,
    fontWeight: "bold",
  },
  con1: {
    color: "#ffc400",
    marginHorizontal: 15,
    marginTop: 3,
    fontWeight: "bold",
    marginTop: 3,
  },
  image: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
  textInput: {
    height: 100,
    borderColor: "#fff",
    borderWidth: 1,
    width: 200,
    color: "#fff",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "column",
    width: 250,
  },
  comment: {
    flexDirection: "row",
    margin: 5,
  },
  imageStyle: {
    width: "100%",
    height: Dimensions.get("window").width,
  },
  heading: {
    width: "100%",
    color: "#ffc400",
    fontSize: 25,
    fontStyle: "normal",
    marginTop: 2,
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 2,
    textDecorationStyle: "dashed",
    lineHeight: 50,
    flexDirection: "row",
  },
  location: {
    color: "#ffc400",
    fontSize: 20,
    fontStyle: "normal",
    marginTop: 5,
    marginBottom: 5,
    textAlign: "left",
    fontWeight: "100",
    letterSpacing: 1,
    margin: 5,
    textDecorationStyle: "dashed",
    lineHeight: 50,
    justifyContent: "flex-start",
  },
  noc: {
    color: "red",
    fontSize: 20,
    fontStyle: "normal",
    textAlign: "right",
    fontWeight: "100",
    margin: 5,
    lineHeight: 50,
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "#333",
    padding: 0,
    flex: 1,
  },
  Description: {
    color: "#ffc400",
    lineHeight: 20,
    marginTop: 5,
    marginHorizontal: 15,
    textAlign: "center",
    padding: 5,
    borderRadius: 2,
    borderColor: "#ffc400",
    borderWidth: 3,
  },
  te: {
    color: "#fff",
  },
  temp: {
    height: 5,
    width: "100%",
    flexDirection: "row",
  },
  nearby: {
    color: "#2ade66",
    margin: 5,
    textAlign: "center",
  },
});

export default Details;
