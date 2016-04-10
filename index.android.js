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

var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.id}
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={() => navigator.push(newRandomRoute())}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Next
        </Text>
      </TouchableOpacity>
    );
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.id} [{index}]
      </Text>
    );
  },

};

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
                navigationBar={
                  <Navigator.NavigationBar
                    routeMapper={NavigationBarRouteMapper}
                    style={styles.navBar}
                  />
                }
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
    },
    navBar: {
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: '#373E4D',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: '#5890FF',
  },  
});

AppRegistry.registerComponent('schoolReact', () => schoolReact);

