import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  ScrollView
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
} = FBSDK;

import { receiveFbat, fetchSessionToken } from '../../actions/tokenActions'
import { fetchEvents } from '../../actions/apiActions'
import apigClient from '../../lib/ellieAPI/apigClient'

const styles = require('./styles');

var STORAGE_KEY = '@Ellie:fbllt';

export default class LoginScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: false,
    }
  }

  componentWillMount() {}

  async prepareToEnter() {
    let { dispatch } = this.props.store
    var fbllt = this.props.store.getState().sessionTokens.fbllt
    console.log("fbllt: ", fbllt)
    if (fbllt) {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, fbllt);
      } catch (error) {
        console.error(error)
      }
      dispatch(fetchSessionToken(fbllt)).then(() => {
        this.getInitialEvents().then(() => {
          this.props.navigator.replace({id:'home'})
        })
      })
      .catch((error) => {
        console.log("error in using fbllt to get API credentials", error)
        this.props.navigator.replace({id:'home'})
      })
    }
    else {
      console.log("did not store fbllt", this.props.store.getState())
    }
  }

  enterHome() {
    this.props.navigator.replace({id:'home'})
  }

  getInitialEvents = async () => {
    let { dispatch } = this.props.store
    var params = {}
    var body = {}
    var additionalParams = {
      headers: {},
      queryParams: {}
    }
    await dispatch(fetchEvents(params, body, additionalParams))
  }

  render() {
    let { dispatch } = this.props.store
    console.log("Login Props",this.props)
    if (this.state.isLoading) {
      return <View style={{flex: 1, alignItems: 'center', marginTop: 300}}><Text>Loading Awesomeness ... </Text></View>
    }
    return(
      <View>
      <View style={styles.loginTitleTextContainer}>
        <Text style={styles.loginTitleText}>
          Login to Ellie
        </Text>
      </View>
      <View style={styles.loginButtonContainer}>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished = {
            (error, result) => {
              if (error) {
                alert("login has error: " + error);
                console.log(error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    this.setState({isLoading: true})
                    dispatch(receiveFbat(data))
                    console.log(this.props.store.getState())
                    console.log(data)
                    dispatch(fetchSessionToken(data.accessToken)).then(() => {
                    this.prepareToEnter().then(() => {
                        //this.enterHome()
                    });
                    })
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
      </View>
  );
  }
}
