/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';
import LoginForm from './components/LoginForm';

export default class App extends Component {
  componentWillMount() {
    var config = {
      apiKey: 'AIzaSyDY_70fmnrEiVRrb3WFstj9nPMpNps08uQ',
      authDomain: 'reactnative-manager-d07a1.firebaseapp.com',
      databaseURL: 'https://reactnative-manager-d07a1.firebaseio.com',
      projectId: 'reactnative-manager-d07a1',
      storageBucket: '',
      messagingSenderId: '260949292308'
    };

    firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
