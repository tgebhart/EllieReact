import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity} from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import Components from '../components/index';

import Home from '../components/Home/home';
import Profile from '../components/profile';
import LikedList from '../components/LikedList/LikedList'
import LoginScreen from '../components/LoginScreen/LoginScreen'


const store = createStore(combineReducers(reducers), applyMiddleware(thunk))


export default class Index extends Component {


  render() {
    return (
      <View style={{flex:1}}>
        <Provider store={store}>
          <Components/>
        </Provider>
      </View>
    );
  }
}
