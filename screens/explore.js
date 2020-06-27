import React, { Component } from "react";
import { Dropdown } from 'react-native-material-dropdown';
import ProgressBar from "react-native-progress/Bar";
import { Dimensions ,TouchableOpacity} from 'react-native';
import firebase from "firebase";

import { Button, View, Text, StyleSheet, Image ,Alert,FlatList} from "react-native";
class explore extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	       tag: '',
	       isLoading:true,
	       dataSource:[],
	       email: "",
	    };
	}
	
	componentDidMount(){

		//Getting user Details


		var user = firebase.auth().currentUser;
	    var name, email, photoUrl, uid, emailVerified;

	    if (user != null) {
	      var s1, s2;
	      user.providerData.forEach(function (profile) {
	        console.log("Sign-in provider: " + profile.providerId);
	        console.log("  Provider-specific UID: " + profile.uid);
	        console.log("  Name: " + profile.displayName);
	        console.log("  Email: " + profile.email);
	        console.log("  Photo URL: " + profile.photoURL);
	        s1 = profile.email;
	        // s2 = profile.photoURL;
	      });
	      this.setState({
	        email: s1,
	        // photoUrl: s2,
	      });
	    }



	    //End of Getting user details








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
		var date = new Date().getDate().toString();
      	var month = new Date().getMonth() + 1;
      	month.toString();
      	var year = new Date().getFullYear().toString();
      	const date_to_update=year.concat('-',month,'-', date)
		console.log(date_to_update);
		this.props.navigation.navigate('Details',{data:item})


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
          alert(responseJson);
          this.setState({ loading: false, disabled: false });
        })
        .catch((error) => {
          console.error(error);
          this.setState({ loading: false, disabled: false });
        });
    });












	//End of updating moument  


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


