/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import firebase from 'react-native-firebase';

 // Initialize Firebase
const config = {
  apiKey: "AIzaSyDaTg87IxDdpma9tNYSRQDvRCGVnvmmIRE",
  authDomain: "todo-50333.firebaseapp.com",
  databaseURL: "https://todo-50333.firebaseio.com",
  projectId: "todo-50333",
  storageBucket: "todo-50333.appspot.com",
  messagingSenderId: "108275039132"
};
let app = firebase.initializeApp(config);
const db = app.database();

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

let iAuthor = db.ref('/author');
let iBooks  = db.ref('/books');

type Props = {};
export default class App extends Component<Props> {
  constructor (props) {
    super(props);
    let autor = {
      title: 'Hello',
      author: 'Fernando Rocha'
    };
    iAuthor.set(autor);
    this.state = {
      title:'a',
      author:'b',
      numr: 1,
      books: []
    };
    // iBooks.push({title: 'livro 1'});
    // iBooks.push({title: 'livro 2'});
  }

  componentDidMount() {
    iAuthor.on('value', (snapshot) => {
      let data = snapshot.val();
      this.setState(data);
      console.log(data);
    });
    iBooks.on('value', (snapshot) => {
      let data = snapshot.val();
      let books = Object.values(data);
      // this.setState({books});
      this.setState({books:books});
      // this.setState({
      //   numr: 2
      // });
      // console.log(data);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native! {this.state.title}?</Text>
        {/* <Text style={styles.welcome}>Title! {this.state.data.title}?</Text> */}
        <Text style={styles.welcome}>contador! {this.state.numr}?</Text>
        <Text style={styles.welcome}>books:</Text>
        {this.state.books.map(item => <Text key={item.title} style={styles.welcome}>Oi {item.title}</Text>)}
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
