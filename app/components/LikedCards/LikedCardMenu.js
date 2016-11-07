import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  MKButton,
  MKIconToggle,
  getTheme,
} from 'react-native-material-kit';


const theme = getTheme();
const styles = require('./styles');

const LikedCardMenu = React.createClass({
  render(){

    let ColoredFab = MKButton.coloredFab()
      .withBackgroundColor(this.props.buttonColor)
      .build();

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
          <View style={styles.menuButtonContainer} >
              <TouchableOpacity onPress = {() => ''}>
                <ColoredFab
                  backgroundColor={this.props.buttonColor}>
                  <Image style={{width:20, height:20}} source={require('../../assets/icons/dislike_blank.png')} />
                </ColoredFab>
              </TouchableOpacity>
              <TouchableOpacity onPress = {() => ''}>
                <ColoredFab>
                  <Image style={{width:25, height:25}} source={require('../../assets/icons/share_blank.png')} />
                </ColoredFab>
              </TouchableOpacity>
              <TouchableOpacity onPress = {() => ''}>
                <ColoredFab>
                  <Text style={{fontSize:16}}>{this.props.price}</Text>
                </ColoredFab>
              </TouchableOpacity>
            </View>
      </View>
    )
  }
});

module.exports = LikedCardMenu;
