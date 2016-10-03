import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';

import {
  MKButton,
  MKColor,
  MKIconToggle,
  getTheme,
} from 'react-native-material-kit';


const theme = getTheme();
const styles = require('./styles');

const LikedCardVenue = React.createClass({
  render(){
    var base64Icon = 'http://www.getmdl.io/assets/demos/welcome_card.jpg';
    var action = (<Text> My action</Text>);
    var menu = (
       <MKIconToggle
        checked={true}
        onCheckedChange={this._onIconChecked}
        onPress={this._onIconClicked}
        >
        <Text pointerEvents="none"
              style={styles.toggleTextOff}>Off</Text>
        <Text state_checked={true}
              pointerEvents="none"
              style={[styles.toggleText, styles.toggleTextOn]}>On</Text>
      </MKIconToggle>
    );
    return (
      <View>
        <View style={theme.cardStyle}>
          <Image source={{uri : base64Icon}} style={theme.cardImageStyle}/>
          <Text style={theme.cardTitleStyle}>Welcome</Text>
          <View  // TextView padding not handled well on Android https://github.com/facebook/react-native/issues/3233
            style={{
              padding : 15,
            }}
            >
            <Text style={[theme.cardContentStyle, {padding:0}]}>
              LOCATION LOCATION LOCATION
            </Text>
          </View>
          <View style={theme.cardMenuStyle}>{menu}</View>
          <View style={theme.cardActionStyle}>
            <Text>My Action</Text>
          </View>
        </View>
      </View>
    )
  }
});

module.exports = LikedCardVenue;
