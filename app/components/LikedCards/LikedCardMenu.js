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
  MKColor,
  MKIconToggle,
  getTheme,
} from 'react-native-material-kit';


const theme = getTheme();
const styles = require('./styles');

const ColoredFab = MKButton.coloredFab()
  .withStyle(styles.fab)
  .build();

const LikedCardMenu = React.createClass({
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
          <View style={styles.menuButtonContainer} >
              <TouchableOpacity style = {styles.buttons} onPress = {() => ''}>
                <ColoredFab>
                  <Image style={{width:20, height:20}} source={require('../../assets/icons/dislike_blank.png')} />
                </ColoredFab>
              </TouchableOpacity>
              <ColoredFab>
                <Image style={{width:25, height:25}} source={require('../../assets/icons/share_blank.png')} />
              </ColoredFab>
              <ColoredFab>
                <Text style={{fontSize:16}}>$15</Text>
              </ColoredFab>
            </View>
      </View>
    )
  }
});

module.exports = LikedCardMenu;
