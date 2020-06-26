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
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          width: "100%",
          backgroundColor: "#1e1e15",
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
              <Text style={styles.t2}>#{item.Tag}</Text>
              <Image
                style={styles.tinyLogo}
                indicator={ProgressBar}
                source={{
                  uri: item.image,
                }}
              />
              <Text style={styles.sm}>{item.Description}</Text>

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
    color: "#000",
    backgroundColor: "#000",
  },
  flatview: {
    justifyContent: "center",
    paddingTop: 5,
    borderRadius: 2,

    textAlign: "center",
    backgroundColor: "#0f0f0a",
    borderRadius: 5,
    borderColor: "#3d3d29",
    borderWidth: 5,

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
    color: "#fff",
  },
  t2: {
    color: "red",
    marginLeft: 20,
  },
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
  sm: {
    color: "#fff",
  },
});
