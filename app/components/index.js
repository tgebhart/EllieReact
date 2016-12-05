import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Navigator,
  View,
  AsyncStorage
} from 'react-native';

import { Provider } from 'react-redux';

import Home from './Home/home';
import Profile from './profile';
import LikedList from './LikedList/LikedList'
import LoginScreen from './LoginScreen/LoginScreen'

import { fetchSessionToken, fetchEmailSessionToken } from '../actions/tokenActions';
import { fetchEvents } from '../actions/apiActions';
import { fetchUserProfile } from '../actions/facebookActions';

const STORAGE_KEY = '@Ellie:fbllt';
const EMAIL_STORAGE_KEY = '@Ellie:email'
const PASSWORD_STORAGE_KEY = '@Ellie:password'

export default class Index extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      initialRoute: {id: 'login', name: 'login'}
    }
  }

  static contextTypes = {
    store: React.PropTypes.object
  }

  componentDidMount() {
    this.getInitialRoute()
  }

  getInitialEvents = async () => {
    let { dispatch } = this.context.store
    var params = {}
    var body = {}
    var additionalParams = {
      headers: {},
      queryParams: {}
    }
    await dispatch(fetchEvents(params, body, additionalParams))
  }

  getUserProfileInfo = async() => {
    let { dispatch } = this.context.store
    await dispatch(fetchUserProfile())
  }

  getInitialRoute = async () => {
    let { dispatch } = this.context.store
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        dispatch(fetchSessionToken(value)).then(() => {
          this.getInitialEvents().then(() => {
            this.getUserProfileInfo().then(() => {
              this.setState({isLoading: false, initialRoute: {id: 'home', name: 'home'}})
            })
          })
        })
        .catch((error) => {
          console.log("error in using fbllt to get API credentials", error)
          this.setState({isLoading: false, initialRoute: {id: 'login', name: 'login'}})
        })
      }
      else {
        console.log("No fbllt found, try looking for email")
        const evalue = await AsyncStorage.getItem(EMAIL_STORAGE_KEY);
        const pvalue = await AsyncStorage.getItem(PASSWORD_STORAGE_KEY);
        if (evalue !== null && pvalue !== null) {
          dispatch(fetchEmailSessionToken(evalue, pvalue)).then(() => {
            this.getInitialEvents().then(() => {
              this.setState({isLoading: false, initialRoute: {id: 'home', name: 'home'}})
            })
          })
          .catch((error) => {
            console.log("error in using email to get API credentials", error)
            this.setState({isLoading: false, initialRoute: {id: 'login', name: 'login'}})
          })
        }
        else {
          console.log("No email found, back to login")
          this.setState({isLoading: false, initialRoute: {id: 'login', name: 'login'}})
        }
      }
    } catch (error) {
      console.log("Error on async storage, back to login", error)
      this.setState({isLoading: false, initialRoute: {id: 'login', name: 'login'}})
    }
  }

  renderScene(route, navigator) {
    var {state,actions} = this.props;
    var routeId = route.id;

    if (routeId === 'home') {
      return (
        <Home
        {...this.props}
        navigator={navigator} />
        );
    }
    if (routeId === 'profile') {
      return (
        <Profile
        {...this.props}
        navigator={navigator} />
        );
    }
    if (routeId === 'likedlist') {
      return (
        <LikedList
        {...this.props}
        navigator={navigator} />
      );
    }
    if (routeId === 'login') {
      return (
        <LoginScreen
        {...this.props}
        store = {this.context.store}
        navigator={navigator} />
      );
    }
  }


  render() {
    if (this.state.isLoading) {
      return <View style={{flex: 1, alignItems: 'center', marginTop: 300}}><Text>Loading Awesomeness ... </Text></View>
    }
    return (
      <View style={{flex:1}}>
        <Navigator
          style={{flex: 1}}
          ref={'NAV'}
          initialRoute={this.state.initialRoute}
          renderScene={this.renderScene.bind(this)}/>
      </View>
    )
  }
}
