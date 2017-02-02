import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

const styles = require('./styles');

const del = require('../../assets/icons/dislike.png');
const share = require('../../assets/icons/share.png');
const ticket = require('../../assets/icons/ticket-rsvp.png')

class RSVPModal extends Component {
  constructor(props) {
    super(props)
  }



  render() {
    console.log("rendinging RSVP")
    return (
      <View>
        <View style={styles.moreOptionsButtonContainer}>
          <TouchableOpacity onPress={() => this.props.pressMoreOptions()} style={{top: 55, alignItems: 'center', alignSelf: 'center'}}>
            <Image source={require('../../assets/icons/moreOptionsButton.png')} style={{tintColor: '#ffef57'}}>
            </Image>
          </TouchableOpacity>
        </View>
        <View style={styles.moreOptionsButtonsContainer}>
          <TouchableOpacity>
            <Image source={require('../../assets/icons/deleteLiked.png')}>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/icons/share.png')}>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/icons/ticket-rsvp.png')}>
            </Image>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

export default RSVPModal;
