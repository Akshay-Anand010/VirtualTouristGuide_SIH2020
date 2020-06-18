import React, { Component } from "react";

import {
  AppRegistry,
  StyleSheet,
  FlatList,
  Text,
  View,
  Alert,
  ActivityIndicator,
  Platform,
  Image,
} from "react-native";

class Dashboard extends Component {
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
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 20,
          width: "100%",
          backgroundColor: "grey",
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
              <Text>{item.Name}</Text>
              <Text>{item.Tag}</Text>
              <Text style={styles.small}>{item.Description}</Text>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: item.Image,
                }}
              />
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
    margin: 10,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
  flatview: {
    justifyContent: "center",
    paddingTop: 30,
    borderRadius: 2,
  },
  FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  tinyLogo: {
    width: 300,
    height: 300,
  },
});
