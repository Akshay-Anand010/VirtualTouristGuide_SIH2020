import React, { Component } from "react";
import MapView, { Marker, Callout, Polygon } from "react-native-maps";
import Carousel from 'react-native-snap-carousel';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Constants } from "expo";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

class Maps extends Component {
  state = {
    location: null,
    errorMessage: null,
  };
  
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }
  componentDidMount=()=>{
    
    this.findCurrentLocationAsync();
    this.findCurrentLocation();
    console.log('started');
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
          console.log(this.state.dataSource.name);

        } else if (responseJson.error) {
          Alert.alert(responseJson.error);
        }
      })

      .catch((error) => {
        console.error(error);
      });
  

     
    
  }

  st={
    markers:[],
    // coordinates:
    // [
    //   { 'latitude': '15.5733', 'longitude': '73.827827','name':'place1','image': require("../assets/png2.png")},
    //   { 'latitude': '15.5556936', 'longitude': 73.75164700000005 ,'name':'place2','image': require("../assets/png2.png")},
    //   { latitude: '15.5128', longitude: 73.7689 ,name:'place3',image: require("../assets/png2.png")},
    //   { latitude: '15.448', longitude: 73.9691 ,name:'place4',image: require("../assets/png2.png")},
    //   { latitude: '15.5009', longitude: 73.9116 ,name:'place5',image: require("../assets/png2.png")},
    // ]

    coordinates:this.state.dataSource
    
  }

  

  renderCarousalItem= ({item}) =>{
  return (
    <View style={styles.cardContainer}>
        <Text style={styles.titleStyle}>{ item.name }</Text>
        <Image style={styles.imageStyle} source={{
                  uri:item.image,
                }} />
    </View>
  );
  }
  onMarkerPressed = (location, index) => {
    this._map.animateToRegion({
      latitude: parseFloat(location.latitude),
      longitude: parseFloat(location.longitude),
      latitudeDelta: 0.09,
      longitudeDelta: 0.035
    });
    Alert.alert(location.name, location.Description, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Ok",
      },
    ]);
    this._carousel.snapToItem(index);
  }
  onCaroselItemChange=(index)=>{
    let location=this.state.dataSource[index];
    this._map.animateToRegion({
      latitude: parseFloat(location.latitude),
      longitude:parseFloat(location.longitude),
      latitudeDelta: 0.22,
      longitudeDelta: 0.0421,
    })
    this.st.markers[index].showCallout();
  }
  
  findCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = JSON.stringify(position.coords.latitude);
        const longitude = JSON.stringify(position.coords.longitude);
        console.log(latitude+' '+longitude)
        lat=latitude
        lon=longitude
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

  caroAlert = function () {
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
          
          <Marker
            draggable
            coordinate={{ latitude:15.4909 , longitude:73.8278 }}
            image={require("../assets/png2.png")}>

            <Callout onPress={this.showWelcomeMessage}>
              <Text>An Interesting city</Text>
            </Callout>

          </Marker>
          {
            this.state.dataSource && this.state.dataSource.map((marker, index) => (
              <Marker
                key={marker.name}
                ref={ref => this.st.markers[index] = ref}
                onPress={() => this.onMarkerPressed(marker, index)}
                coordinate={{ latitude:parseFloat(marker.latitude), longitude: parseFloat(marker.longitude) }}
              >
                <Callout>
                  <Text>{marker.name}</Text>
                </Callout>

              </Marker>
            ))
          }


          


        </MapView>
        <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.dataSource}
              containerCustomStyle={styles.carousel}
              renderItem={this.renderCarousalItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={300}
              onSnapToItem={(index) => this.onCaroselItemChange(index)}
        />
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
    ...StyleSheet.absoluteFillObject

  },
  
  mapStyle: {
    ...StyleSheet.absoluteFillObject
  },
  te: {
    color: "red",
  },
  btn: {
    marginTop: 2,
    color: "red",
  },
  carousel:{
    position:"absolute",
    bottom:0,
    marginBottom:48
  },
  cardContainer:{
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 200,
    width:300,
    padding:24,
    borderRadius:24
  }
  ,imageStyle:{
    height:150,
    width:300,
    bottom:0,
    position:'absolute',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },
  titleStyle:{
    color:'white',
    fontSize:18,
    alignSelf:'center',
  }

});

export default Maps;
