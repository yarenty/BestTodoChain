var React = require('react-native');

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
} = React;


var BestTodoChain = React.createClass({
  render: function() {
  	var movie = MOCKED_MOVIES_DATA[0];

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.cool}>
        JARO RuleZ
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js{'\n'}
          Press Cmd+R to reload
        </Text>
        <Text>{movie.title}</Text>
        <Text>{movie.year}</Text>
        <Image source={{uri: movie.posters.thumbnail}} style={styles.thumbnail}/>

      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  cool: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#FF3333'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
});


AppRegistry.registerComponent('BestTodoChain', () => BestTodoChain);
