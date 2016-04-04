'use strict';

import React, {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Image,
  Component,
  ActivityIndicatorIOS,
  ToolbarAndroid,
} from 'react-native';

var SearchResults = require('./SearchResults');

function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
  };
  data[key] = value;

  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'http://api.nestoria.co.uk/api?' + querystring;
};

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: 'london',
            isLoading: false,
            message: this.props.message,
            navigator : this.props.navigator
        };
    }
    onSearchTextChanged(event) {
        console.log('on search text changed');
        this.setState({searchString: event.nativeEvent.text});
        console.log(this.state.searchString);
    }
    _executeQuery(query) {
        console.log(query);
        this.setState({isLoading:true});
        fetch(query)
            .then(response => response.json())
            .then(json => this._handleResponse(json.response))
            .catch(error => 
                this.setState({
                    isLoading:false,
                    message: 'Error happened ' + error
                }));
    }
    _handleResponse(response) {
        console.log("Response : " + response);
        this.setState({isLoading:false, message:''});
        if(response.application_response_code.substr(0,1) === '1') {
            console.log('Properties found ' + response.listings.length);
            /*this.props.navigator.push({
                message: 'Results',
                component: SearchResults,
                passProps: {listings: response.listings}
            });*/
            this.props.navigator.push({id:'results', listings:response.listings});
            
        } else {
            this.setState({message: 'Location not recognized, please try again'});
        }
    }
    onSearchPressed() {
        var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
        this._executeQuery(query);
    }
    onLocationPressed() {
        navigator.geolocation.getCurrentPosition(
            location => {
                  var search = location.coords.latitude + ',' + location.coords.longitude;
                  this.setState({ searchString: search });
                  var query = urlForQueryAndPage('centre_point', search, 1);
                  this._executeQuery(query);
                },
                error => {
                    console.log(error);
                  this.setState({
                    message: 'There was a problem with obtaining your location: ' + error
                  });
                });
        
    }
    render() {
        var spinner = this.state.isLoading ?
                        (<ActivityIndicatorIOS hidden='true' size='large' />):(<View/>);
        return (
            <View>
            <ToolbarAndroid
                title="首页"
                style={{height:56,backgroundColor:'#ffffff'}}>
                </ToolbarAndroid>
            <View style={styles.container}>        
                    <Text style={styles.description}>
                        搜索房屋信息
                    </Text>
                    <View style={styles.flowRight}>
                        <TextInput style={styles.searchInput}
                            value = {this.state.searchString}
                            onChange = {this.onSearchTextChanged.bind(this)}
                            placeholder = '输入小区名称或地址' />
                        <TouchableHighlight style={styles.button}
                            onPress = {this.onSearchPressed.bind(this)}
                            underlayColor='#99d9f4'>
                            <Text style={styles.buttonText}>Go</Text>
                        </TouchableHighlight>
                    </View>
                    <TouchableHighlight style={styles.button}
                        onPress = {this.onLocationPressed.bind(this)}
                        underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Location</Text>
                    </TouchableHighlight>
                    <Image source={require('../image/house.png')} style={styles.image} />
                    <Text style={styles.description}>{this.state.message}</Text>
                    {spinner}
               </View></View>
           );
    }
}
var styles = StyleSheet.create({
    description: {
      marginBottom:20,
      fontSize:18,
      textAlign: 'center',
      color: '#656565'
    },
    toolbar: {  
        backgroundColor: '#e9eaed',  
        height: 56,  
    },  
    container: {
      padding: 30,
      marginTop: 65,
      alignItems: 'center'
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height:36,
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    },
    image: {
        width: 217,
        height: 138
    }
});

module.exports = SearchPage;
