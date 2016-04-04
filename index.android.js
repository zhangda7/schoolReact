/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  BackAndroid,
} from 'react-native';

var SearchPage = require('./js/page/SearchPage');
var SearchResults = require('./js/page/SearchResults');
var DetailView = require('./js/page/DetailView');

var _navigator;

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
class HelloWorld extends Component {
  render() {
    return <Text style={styles.text}>Helo World(Again)</Text>;
    //return React.createElement(Text, {style:styles.text}, "Hello world!");
  }
}
class schoolReact extends Component {
    navigatorRenderScene(route, navigator) {
        _navigator = navigator;
        switch(route.id) {
            case 'search':
                return (<SearchPage
                            title = 'search'
                            message={route.id}
                            navigator = {_navigator} />); 
            case 'results':
                return (<SearchResults
                            title = 'Results'
                            message='results'
                            listings={route.listings}
                            navigator = {_navigator} /> );
            case 'detail':
                return (<DetailView
                            title = 'Detail'
                            property = {route.property}
                            navigator = {_navigator} /> );
        }
    }
    render() {
        return (
            <Navigator
                style={styles.container}
                initialRoute={{id:'search' }}
                renderScene={this.navigatorRenderScene}
                configureScene = {(route) => {
                    if(route.sceneConfig) {
                        return route.sceneConfig;
                    }
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                />
        );
    }
}

BackAndroid.addEventListener('hardwareBackPress', () => {
    if(_navigator.getCurrentRoutes().length === 1) {
        return false;
    }
    _navigator.pop();
    return true;
})



var styles = StyleSheet.create({
  text: {
      color: 'white',
      backgroundColor: 'black',
      fontSize: 30,
      margin: 80
    },
  container : {
    flex:1
  }
});

AppRegistry.registerComponent('schoolReact', () => schoolReact);

