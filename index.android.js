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
} from 'react-native';

var SearchPage = require('./android/app/src/react/SearchPage');

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
          <Navigator
        initialRoute={{name: 'My First Scene', index: 0}}
        renderScene={(route, navigator) =>
          <SearchPage
            name={route.name}
            onForward={() => {
              var nextIndex = route.index + 1;
              navigator.push({
                name: 'Scene ' + nextIndex,
                index: nextIndex,
              });
            }}
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
        }
      />
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

