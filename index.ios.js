var React = require('react-native');

var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 5;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;



var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];


var TodoList = React.createClass({
  render: function() {
    var createItem = function(itemText) {
      return <li>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});






var BestTodoChain = React.createClass({
 getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },



  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
    <View >

      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({input: text})}
        />
        <Text style={styles.outtext}>{'user input: ' + this.state.input}</Text>
      </View>
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Connecting to rememome...
        </Text>
      </View>
    );
  },

  renderMovie: function(movie) {
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
  },
});

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
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  outtext: {
      textAlign: 'center',
      backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('BestTodoChain', () => BestTodoChain);
