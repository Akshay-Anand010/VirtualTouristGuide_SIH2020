import React, { Component } from "react";
import { Dropdown } from 'react-native-material-dropdown';
import ProgressBar from "react-native-progress/Bar";
import { Dimensions ,TouchableOpacity} from 'react-native';

import { Button, View, Text, StyleSheet, Image ,Alert,FlatList} from "react-native";
class explore extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	       tag: '',
	       isLoading:true,
	       dataSource:[]
	    };
	}
	
	componentDidMount(){

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
	          dataSource: responseJson, 

	        });
	        if (responseJson) {
			  // console.log(this.state.dataSource)
	         
	        } else if (responseJson.error) {
	          // Alert.alert(responseJson.error);
	        }
	      })

	      .catch((error) => {
	        console.error(error);
	      });

	    
	}
	renderCategories() { return this.state.dataSource.map((item, index) => <Text key={index}>{item.Tag}</Text>); }

	actionOnRow(item) {
		this.props.navigation.navigate('Details',{data:item})
	}
  	render() {
  		const {navigate} =this.props.navigation;
  		const { dataSource, tag } = this.state;

		const tagFilter = item => {
			  if (tag) {
			    return item.Tag === tag;
			  }
			  return true;
		}
	  	let data = [{
	      value: 'Church',
	    }, {
	      value: 'Beach',
	    }, {
	      value: 'Temple',
		},{
		  value:'Waterfall'	
		},
		{
		  value:'Town'
		},
		{
		  value:'Wildlife Sanctuary'
		},
		,
		{
		  value:'Mosque'
		},
		{
		  value:'Heritage House'
		},
		,
		{
		  value:'Fort'
		},
		,
		{
		  value:'Club'
		},
		{
		  value:'Lake'
		},
		{
		  value:'Island'
		},

		];
    	

    return (	
		  <View style={styles.MainContainer}>
		  	
		  	
      	  	<Dropdown
	        	label='TAG'
	        	data={data}
	        	onChangeText={tag => this.setState({ tag })}
      	  	/>

      	  	


      	  	
      	  	<FlatList
	          data={dataSource.filter(tagFilter)}
	          ItemSeparatorComponent={this.FlatListItemSeparator}
	          renderItem={({ item }) => (
	          	<TouchableOpacity onPress={() => this.actionOnRow(item)}>
		            <View style={styles.flatview}>
		              <Text style={styles.t1}>{item.name}</Text>
		              <Text style={styles.t2}>#{item.Tag}</Text>
		            </View>
	            </TouchableOpacity>
	          )}
        	/>






		  </View>

    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 3,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    color: "#000",
    backgroundColor: "#fff",
  },
  flatview: {
    justifyContent: "center",
    paddingTop: 5,
    borderRadius: 2,

    textAlign: "center",
    backgroundColor: "#333",
    borderRadius: 5,
    borderColor: "#333",
    borderWidth: 5,

    margin:3,
  },
  tinyLogo: {
   	width: 300,
    height: 300,
    alignItems: "center",
    alignContent: "center",
    marginLeft: 12,
    marginBottom:10
  },
  t1: {
    fontSize: 20,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    color: "#f7c00c",
  },
  t2: {
    color: "red",
    marginLeft: 20,
  },
  
});

export default explore;


