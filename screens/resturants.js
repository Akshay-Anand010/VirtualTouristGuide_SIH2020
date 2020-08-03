import React, { useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  Linking,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon1 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/FontAwesome5";
import { SearchBar } from "react-native-elements";
import Image from "react-native-image-progress";
import ProgressBar from "react-native-progress/Bar";
import { Button } from "react-native-paper";
import { StackView } from "react-navigation-stack";
import openMap from "react-native-open-maps";

var screen = Dimensions.get("window");

export default class Resturant extends React.Component {
  kholo = (lat, leng) => {
    openMap({ latitude: lat, longitude: lang });
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      search: "",
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    return fetch("http://docbook.orgfree.com/resturant.php")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function () {
            this.arrayholder = responseJson;
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }
  search = (text) => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };
  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function (item) {
      const itemData = item.Name ? item.Name.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "90%",
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
      <View style={styles.viewStyle}>
        <SearchBar
          lightTheme
          searchIcon={{ size: 24 }}
          onChangeText={(text) => this.SearchFilterFunction(text)}
          onClear={(text) => this.SearchFilterFunction("")}
          placeholder="Search for Hotels near you..."
          value={this.state.search}
        />
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          var
          renderItem={({ item }) => (
            <View style={styles.flatlist} elevation={5}>
              <Text style={styles.t1}>{item.Name}</Text>
              <Image
                style={styles.tinyLogo}
                indicator={ProgressBar}
                source={{
                  uri: item.photourl,
                }}
              />
              <View style={styles.namo}>
                <Icon name="room-service-outline" size={30} />
                <Text style={styles.tl}>{item.famouscuisine}</Text>
              </View>
              <View style={styles.namo}>
                <Icon3 name="business-time" size={30} />
                <Text>
                  {item.openhrs} - {item.closehrs}
                </Text>
              </View>
              <View style={styles.namo}>
                <Icon1 name="location-pin" size={30} />
                <Text style={styles.tl}>{item.address}</Text>
              </View>
              <Button
                style={styles.TextStyle}
                onPress={() => {
                  this.kholo(item.latitude, item.longitude);
                }}
              >
                Open in Maps
              </Button>
            </View>
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
    marginTop: Platform.OS == "ios" ? 40 : 0,
    marginTop: 3,
    marginHorizontal: 10,
  },
  namo: {
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    paddingRight: 5,
  },
  tl: {
    marginTop: 5,
    marginRight: 10,
    paddingRight: 5,
  },
  TextStyle: {
    color: "#E91E63",
    fontStyle: "normal",
  },
  t1: {
    fontWeight: "bold",
    marginLeft: 15,
    fontSize: 22,
  },
  col: {
    color: "blue",
    fontWeight: "bold",
  },
  ne: {
    flexDirection: "row",
    marginTop: 10,
  },
  t2: {
    color: "grey",
  },
  p1: {
    marginTop: 5,
  },
  tm: {
    fontWeight: "bold",
    color: "#ff0000",
  },
  tm1: {
    color: "#ffd11a",
    marginLeft: 80,
  },
  mp: {
    color: "#1a75ff",
    fontWeight: "bold",
  },
  status: {
    color: "#ff1a1a",
    marginLeft: 12,
    marginTop: 5,
  },

  search: {
    backgroundColor: "#fff",
  },
  textStyle: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  flatlist: {
    paddingTop: 5,
    borderRadius: 2,
    backgroundColor: "#fff",
    borderRadius: 5,
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
  tinyLogo: {
    width: 300,
    height: 200,
    marginLeft: 10,
    marginTop: 10,
  },
  inner: {
    marginLeft: 10,
    width: 160,
  },
  rating: {
    marginTop: 10,
    marginRight: 15,
    height: 20,
    width: 30,
  },
  rate: {
    backgroundColor: "#008000",
    padding: 5,
    borderRadius: 3,
    color: "#fff",
  },
});
