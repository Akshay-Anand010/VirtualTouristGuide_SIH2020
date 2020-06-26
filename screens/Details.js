import React, { Component } from "react";
import { Dropdown } from 'react-native-material-dropdown';
import ProgressBar from "react-native-progress/Bar";
import { Dimensions,SafeAreaView,ScrollView } from 'react-native';

import { Button, View, Text, StyleSheet, Image ,Alert,FlatList} from "react-native";
class Details extends Component {

	constructor(props){
    super(props);
    this.state={
      data:''
    }
  }
	

  componentDidMount(){
    const data =this.props.navigation.getParam('data',{})
    this.setState({
      data
    });
  }


  	render() {
  		
    return (	
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
		  <View style={styles.Main}>
		  	

      	<Text style={styles.heading}>{this.state.data.name}</Text>
        <Image style={styles.imageStyle} source={{
                  uri:this.state.data.image,
        }} />

        <View style={styles.Container}>
          <View>
          <Text style={styles.location}>{this.state.data.Location}</Text>
          </View>
        </View>
      	  	
      	
        <Text style={styles.Description}>
          {this.state.data.Description}
        </Text> 






		  </View>
    </ScrollView>
    </SafeAreaView>

    );
  }
}

const styles=StyleSheet.create({
  Main:{
    height:Dimensions.get('window').height,
    width:Dimensions.get('window').width,
    backgroundColor:'#333'

  },
  imageStyle:{
    width:'100%',
    height:200
  },
  heading:{
    width:'100%',
    color:'#ffc400',
    fontSize:25,
    fontStyle:'normal',
    marginTop:5,
    marginBottom:5,
    textAlign:'center',
    fontWeight:"bold",
    letterSpacing:2,
    textDecorationStyle:'dashed',
    lineHeight:50

  },
  location:{
    color:'#ffc400',
    fontSize:20,
    fontStyle:'normal',
    marginTop:5,
    marginBottom:5,
    textAlign:'left',
    fontWeight:"100",
    letterSpacing:1,
    margin:5,
    textDecorationStyle:'dashed',
    lineHeight:50,
    justifyContent:'flex-start'
  },
  noc:
  {
    color:'red',
    fontSize:20,
    fontStyle:'normal',
    textAlign:'right',
    fontWeight:"100",
    margin:5,
    lineHeight:50,
    justifyContent:'flex-end'
  },
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'pink',
  },
  Description:{
    color:'#2ade66',
    lineHeight:20,
    margin:5,
    textAlign:'center'
  }
})

export default Details;


