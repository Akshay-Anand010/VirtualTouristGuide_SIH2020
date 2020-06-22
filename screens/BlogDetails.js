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
  Button,
} from "react-native";
import Image from "react-native-image-progress";
import * as Font from "expo-font";
import ProgressBar from "react-native-progress/Bar";
import { FAB } from "react-native-paper";
import Icon1 from "react-native-vector-icons/FontAwesome";

class Dashboard extends Component {
  speak() {
    var thingToSay = "0";
    Speech.speak(thingToSay);
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
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
          Alert.alert("Id is" + JSON.stringify(responseJson)); //==>this give me an alert
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
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) => (
            <View style={styles.flatview}>
              <Text style={styles.t1}>{item.name}</Text>
              <Text style={styles.t2}>{item.Tag}</Text>
              <Image
                style={styles.tinyLogo}
                indicator={ProgressBar}
                source={{
                  uri: item.image,
                }}
              />
              <Text style={styles.small}>{item.Description}</Text>

              <View style={styles.card}>
                <Button
                  title="Speak!"
                  onPress={() => Speech.speak(item.Description)}
                  style={styles.new1}
                />

                <Button
                  title="Stop"
                  onPress={() => Speech.stop()}
                  style={styles.new2}
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
        <FAB
          style={styles.fab}
          small
          icon="chat"
          onPress={() => this.props.navigation.navigate("chatbot")}
        />
      </View>
    );
  }
}

export default Dashboard;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 3,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
  flatview: {
    justifyContent: "center",
    paddingTop: 5,
    borderRadius: 2,

    textAlign: "center",
    backgroundColor: "#ebebe0",
    borderRadius: 5,
    borderColor: "#ccccb3",
    borderWidth: 5,
    marginTop: 5,
    marginLeft: 3,
    marginRight: 3,
  },
  FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  tinyLogo: {
    width: 300,
    height: 300,
    alignItems: "center",
    alignContent: "center",
    marginLeft: 12,
  },
  card: {
    flex: 1,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  t1: {
    fontFamily: "Pacifico-Regular",
    fontSize: 30,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  t2: {},
  new1: {
    marginLeft: 10,
    marginTop: 10,
    alignItems: "center",
  },
  new2: {
    marginRight: 10,
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
});
