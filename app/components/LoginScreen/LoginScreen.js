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
import apigClient from '../../lib/ellieAPI/apigClient'

var STORAGE_KEY = '@Ellie:fbllt';

export default class LoginScreen extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount() {
  }

  async prepareToEnter() {
    var fbllt = this.props.store.getState().sessionTokens.fbllt
    console.log("fbllt: ", fbllt)
    if (fbllt) {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, fbllt);
      } catch (error) {
        console.error(error)
      }
    }
    else {
      console.log("did not store fbllt", this.props.store.getState())
    }
  }

  enterHome() {
    this.props.navigator.replace({id:'home'})
  }

  render() {
    let { dispatch } = this.props.store
    console.log("Login Props",this.props)
    return(
    <View style={{flex: 1, alignItems: 'center', marginTop: 300}}>
      <LoginButton
        publishPermissions={["publish_actions"]}
        onLoginFinished = {
          (error, result) => {
            if (error) {
              alert("login has error: " + result.error);
            } else if (result.isCancelled) {
              alert("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken().then(
                (data) => {
                  dispatch(receiveFbat(data))
                  console.log(this.props.store.getState())
                  dispatch(fetchSessionToken(data.accessToken)).then(() => {
                    this.prepareToEnter().then(() => {
                      this.enterHome()
                    });
                  })
                }
              )
            }
          }
        }
        onLogoutFinished={() => alert("logout.")}/>
    </View>
  );
  }
}
