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
} from 'react-native';

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
class schoolReact extends Component {
  render() {
    var movie = MOCKED_MOVIES_DATA[0];
    return (
       <View style={styles.container}>
         <Image
           source={{uri: movie.posters.thumbnail}}
           style={styles.thumbnail}
         />
         <View style={styles.rightContainer}>
           <Text style={styles.title}>{movie.title}</Text>
           <Text style={styles.year}>{movie.year}</Text>
         </View>
       </View>
     );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
    fontSize:20
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
