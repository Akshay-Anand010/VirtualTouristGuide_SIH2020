import React, { Component } from "react";
import * as Speech from "expo-speech";
import {
  AppRegistry,
  StyleSheet,
  FlatList,
  Text,
  View,
  Alert,
  ActivityIndicator,
  Platform,
  Modal,
  TouchableOpacity,
} from "react-native";
import Image from "react-native-image-progress";
import * as Font from "expo-font";
import ProgressBar from "react-native-progress/Bar";
import firebase from "firebase";
import Icon1 from "react-native-vector-icons/FontAwesome";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

class Dashboard extends Component {
  state = {
    isVisible: false,
  };

  // hide show modal
  displayModal(show) {
    this.setState({ isVisible: show });
  }

  speak() {
    var thingToSay = "0";
    Speech.speak(thingToSay);
  }

  getUser = () => {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      var s1, s2;
      user.providerData.forEach(function (profile) {
        console.log("  Email: " + profile.email);
        s1 = profile.displayName;
        s2 = profile.email;

        //User Email is in S2 Now Calling Axios to get the user Preferences
      });
      this.setState({
        name: s1,
        email: s2,
      });
    }
  };
  constructor(props) {
    super(props);

    this.state = {
      tag: "",
      isLoading: true,
      dataSource: [],
      email: "",
    };
  }

  actionOnRow(item) {
    var date = new Date().getDate().toString();
    var month = new Date().getMonth() + 1;
    month.toString();
    var year = new Date().getFullYear().toString();
    const date_to_update = year.concat("-", month, "-", date);
    console.log(date_to_update);
    this.props.navigation.navigate("Details", { data: item });

    //Storing User Clicks Email Wise
    this.setState({ loading: true, disabled: true }, () => {
      fetch("http://docbook.orgfree.com/touch1.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,

          tag: item.Tag,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // alert(responseJson);
          this.setState({ loading: false, disabled: false });
        })
        .catch((error) => {
          console.error(error);
          this.setState({ loading: false, disabled: false });
        });
    });

    // End of Storing User Clicks

    //Updating Monument Count

    this.setState({ loading: true, disabled: true }, () => {
      fetch("http://docbook.orgfree.com/touch2.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mid: item.Mid,

          date_touched: date_to_update,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //   alert(responseJson);
          this.setState({ loading: false, disabled: false });
        })
        .catch((error) => {
          console.error(error);
          this.setState({ loading: false, disabled: false });
        });
    });

    //End of updating moument
  }

  componentDidMount() {
    this.getUser();
    fetch("http://docbook.orgfree.com/home.php", {
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
          // dataSource: JSON.parse(responseJson),
          dataSource: responseJson, //===>i think this is were problem
        });
        if (responseJson) {
          // Alert.alert("Id is" + JSON.stringify(responseJson)); //==>this give me an alert
          // console.log(responseJson);
        } else if (responseJson.error) {
          Alert.alert(responseJson.error);
        }
      })

      .catch((error) => {
        console.error(error);
      });

    Font.loadAsync({
      "Pacifico-Regular": require("../fonts/Pacifico-Regular.ttf"),
    });
    console.log("this" + this.state);
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          width: "100%",
          backgroundColor: "#fff",
        }}
      />
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.MainContainer}>
        <ScrollView>
          <Text style={styles.ht}>Hotels near you!</Text>
          <View style={styles.con2}>
            <Swiper>
              <View style={styles.slideContainer}>
                <TouchableOpacity style={styles.im}>
                  <Image
                    source={require("../assets/hotel.jpg")}
                    style={styles.im}
                  />
                  <Text style={styles.tl}>Enjoy the Luxury!</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.slideContainer]}>
                <TouchableOpacity style={styles.im}>
                  <Image
                    source={require("../assets/hotel2.jpg")}
                    style={styles.im}
                  />
                  <Text>Slide 3</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.slideContainer, styles.slide3]}>
                <TouchableOpacity style={styles.im}>
                  <Image
                    source={require("../assets/hotel3.jpg")}
                    style={styles.im}
                  />
                  <Text>Slide 3</Text>
                </TouchableOpacity>
              </View>
            </Swiper>
          </View>
          <Text style={styles.ht}>Monuments</Text>
          <FlatList
            data={this.state.dataSource}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({ item }) => (
              <View style={styles.job}>
                <ScrollView style={styles.job1}>
                  <Card>
                    <Card.Title
                      title={item.name}
                      subtitle={item.Tag}
                      left={LeftContent}
                    />
                    <Card.Content></Card.Content>
                    <Card.Cover
                      source={{ uri: item.image }}
                      style={styles.ikea}
                    />
                    <Card.Actions>
                      <Button onPress={() => Speech.speak(item.Description)}>
                        Audio
                      </Button>
                      <Button onPress={() => Speech.stop()}>stop</Button>
                      <Button onPress={() => this.actionOnRow(item)}>
                        view details
                      </Button>
                    </Card.Actions>
                  </Card>
                </ScrollView>
              </View>
            )}
            keyExtractor={(item, index) => index}
          />
        </ScrollView>
      </View>
    );
  }
}

export default Dashboard;

const styles = StyleSheet.create({
  con2: {
    flex: 1,
    height: 200,
  },
  tl: {
    fontSize: 25,
    color: "#fff",
  },
  ht: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
    color: "grey",
  },
  slideContainer: {
    flex: 1,
    height: 150,
  },
  slide1: {
    backgroundColor: "rgba(20,20,200,0.3)",
  },
  slide2: {
    backgroundColor: "rgba(20,200,20,0.3)",
  },
  slide3: {
    backgroundColor: "rgba(200,20,20,0.3)",
  },
  im: {
    width: "100%",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 3,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    color: "#fff",
    backgroundColor: "#fff",
    flexDirection: "column",
  },

  job: {
    flexDirection: "column",
  },
  ikea: {
    borderRadius: 10,
  },
  flatview: {
    paddingTop: 5,
    borderRadius: 2,
    backgroundColor: "#fff",
    borderRadius: 5,
    flexDirection: "row",
    padding: 5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    marginLeft: 3,
    marginRight: 3,
  },
  FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  tinyLogo: {
    width: 100,
    height: 200,
    alignItems: "center",
    alignContent: "center",
    marginRight: 5,
  },
  tinyLogo1: {
    width: 400,
    height: 300,
    alignItems: "center",
    alignContent: "center",
    marginLeft: 5,
    marginRight: 5,
  },
  card: {
    flex: 1,
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    marginRight: 5,
  },
  t1: {
    fontFamily: "Pacifico-Regular",
    fontSize: 20,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginRight: 55,
    color: "#000",
  },
  t2: {
    color: "red",
    marginLeft: 20,
  },
  new1: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    alignItems: "center",
    width: 30,
  },
  new2: {
    marginRight: 2,
    marginTop: 10,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
    width: 50,
    color: "#fff",
    backgroundColor: "red",
    alignContent: "center",
  },
  sm: {
    color: "#5c5c3d",
  },
  no1: {
    flexDirection: "column",
  },
  no2: {
    flexDirection: "column",
    marginRight: 5,
    width: 300,
  },
  button: {
    display: "flex",
    height: 40,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    marginLeft: 20,
    backgroundColor: "#ffcc00",
    shadowColor: "#2AC062",
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 25,
  },
  closeButton: {
    display: "flex",
    height: 40,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF3974",
    shadowColor: "#2AC062",
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 22,
  },
  image: {
    marginTop: 150,
    marginBottom: 10,
    width: "100%",
    height: 350,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
    padding: 40,
  },
  closeText: {
    fontSize: 24,
    color: "#00479e",
    textAlign: "center",
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#00ff00",
    padding: 100,
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
  },
});
