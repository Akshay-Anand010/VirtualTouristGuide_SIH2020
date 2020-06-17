import React, { Component } from "react";
import MapView, { Marker, Callout, Polygon } from "react-native-maps";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Constants } from "expo";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

class Maps extends Component {
  componentDidMount=()=>{
    
    this.findCurrentLocationAsync();
    this.findCurrentLocation();
    
  }

  state = {
    location: null,
    errorMessage: null,
  };

  

  findCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = JSON.stringify(position.coords.latitude);
        const longitude = JSON.stringify(position.coords.longitude);
        console.log(latitude+latitude)
        let region={
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.22,
          longitudeDelta: 0.0421,
        }
        this.setState({
          initialPosition:region
        });
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  findCurrentLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
    }
    console.log('Android granted!')
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  getLocation = function () {
    Alert.alert("Welcome to Goa!", "get Location! ", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Ok",
      },
    ]);
  };

  render() {
    let text=""
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    return (
      <View style={styles.container}>
        <MapView
          ref={map=>this._map=map}
          style={styles.mapStyle}
          showsUserLocation={true}
          initialRegion={this.state.initialPosition}
          
        >
          <Polygon
            coordinates={[
              { latitude: 15.5733, longitude: 73.827827 },
              { latitude: 15.5556936, longitude: 73.75164700000005 },
              { latitude: 15.5128, longitude: 73.7689 },
              { latitude: 15.448, longitude: 73.9691 },
              { latitude: 15.5009, longitude: 73.9116 },
            ]}
            strokeWidth={3}
          />
          <Marker coordinate={{ latitude: 15.496777, longitude: 73.827827 }}>
            <Callout onPress={this.getLocation}>
              <Text>Panji</Text>
              <Image source={require("../assets/png2.png")} />
            </Callout>
          </Marker>
          <Marker coordinate={{ latitude: 15.5733, longitude: 73.827827 }}>
            <Callout onPress={this.getLocation}>
              <Text>Arjuna Beach</Text>
              <Image source={require("../assets/png2.png")} />
            </Callout>
          </Marker>
          <Marker coordinate={{ latitude: 15.5128, longitude: 73.7689 }}>
            <Callout onPress={this.getLocation}>
              <Text>Candolim Beach</Text>
              <Image source={require("../assets/png2.png")} />
            </Callout>
          </Marker>
          <Marker coordinate={{ latitude: 15.448, longitude: 73.9691 }}>
            <Callout onPress={this.getLocation}>
              <Text>Mangueshi Village</Text>
              <Image source={require("../assets/png2.png")} />
            </Callout>
          </Marker>
          <Marker coordinate={{ latitude: 15.5009, longitude: 73.9116 }}>
            <Callout onPress={this.getLocation}>
              <Text>Basilica Of Bom</Text>
              <Image source={require("../assets/png2.png")} />
            </Callout>
          </Marker>
          <Marker
            coordinate={{ latitude: 15.5556936, longitude: 73.75164700000005 }}
          >
            <Callout onPress={this.getLocation}>
              <Text>Baga Beach</Text>
              <Image source={require("../assets/png2.png")} />
            </Callout>
          </Marker>


          


        </MapView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",

  },
  
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  te: {
    color: "red",
  },
  btn: {
    marginTop: 2,
    color: "red",
  },
});

export default Maps;
