import React, { Component } from "react";
import MapView,{Marker, Callout, Polygon} from "react-native-maps";
import { StyleSheet, Text, View, Dimensions,Image, Alert } from "react-native";
class Maps extends Component {
  
  getLocation =function(){
    Alert.alert(
      'Welcome to Goa!',
      'get Location! ',
      [
        {
          text:'Cancel',
          style:'cancel'
        },
        {
          text:'Ok'
        }
      ]
    )
  }
  



  render() {
    return (
      <View style={styles.container}>
  
        < MapView style={styles.mapStyle}
          showsUserLocation={true}
          initialRegion={{
            latitude: 15.496777,
            longitude: 73.827827,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Polygon
          coordinates={[
              {latitude:15.5733,longitude:73.827827},
              {latitude:15.5556936,longitude:73.75164700000005},
              {latitude:15.5128,longitude:73.7689},
              {latitude:15.4480,longitude:73.9691},
              {latitude:15.5009,longitude:73.9116},
              
          ]}  
          
          strokeWidth={3}
          />
          <Marker
            coordinate={{latitude:15.496777,longitude:73.827827}}
          >
            <Callout onPress={this.getLocation}>
              <Text>Panji</Text>
              <Image source={require('../assets/png2.png')}/>
            </Callout>
          </Marker>
          <Marker
            coordinate={{latitude:15.5733,longitude:73.827827}}
          >
            <Callout onPress={this.getLocation}>
              <Text>Arjuna Beach</Text>
              <Image source={require('../assets/png2.png')}/>
            </Callout>
          </Marker>
          <Marker
            coordinate={{latitude:15.5128,longitude:73.7689}}
            
          >
            <Callout onPress={this.getLocation}>
              <Text>Candolim Beach</Text>
              <Image source={require('../assets/png2.png')}/>
            </Callout>
          </Marker>
          <Marker
            coordinate={{latitude:15.4480,longitude:73.9691}}
            
          >
            <Callout onPress={this.getLocation}>
              <Text>Mangueshi Village</Text>
              <Image source={require('../assets/png2.png')}/>
            </Callout>
          </Marker>
          <Marker
            coordinate={{latitude:15.5009,longitude:73.9116}}
            
          >
            <Callout onPress={this.getLocation}>
              <Text>Basilica Of Bom</Text>
              <Image source={require('../assets/png2.png')}/>
            </Callout>
          </Marker>
          <Marker
            coordinate={{latitude:15.5556936,longitude:73.75164700000005}}
            
          >
            <Callout onPress={this.getLocation}>
              <Text>Baga Beach</Text>
              <Image source={require('../assets/png2.png')}/>
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
});

export default Maps;
