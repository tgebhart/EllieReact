import React, { Component } from 'react';
import { View } from 'react-native'
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
} = FBSDK;

var FBLoginButton = React.createClass({
  render: function() {
    return (
      <View>
        <LoginButton
          publishPermissions={["rsvp_event"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
  }
});

export default FBLoginButton;
