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
  NavigatorIOS,
} from 'react-native';

var SearchPage = require('./SearchPage');

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
  render() {
    return (
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: 'Property Finder',
            component: SearchPage,
          }}/>
    );
  }
}

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

