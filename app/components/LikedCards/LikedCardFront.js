import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';

import LinearGradientView from 'react-native-linear-gradient'

import RSVPModal from './RSVPModal';


const styles = require('./styles');

class LikedCardFront extends Component {
  constructor(props){
    super(props)
    this.pressMoreOptions = this.pressMoreOptions.bind(this);
    this.state = {
      rsvpVisible: false
    };
  }

  pressMoreOptions() {
    this.setState({rsvpVisible: !this.state.rsvpVisible})
  }

  render() {
    if (this.state.rsvpVisible) {
      return (
        <View style={styles.container}>
          <View style={styles.card}>
            <Image source ={{uri: this.props.image}} resizeMode="cover" style={styles.cardImage}>
              <View style={{backgroundColor: this.props.imageBlur, height:this.props.cardHeight, width:this.props.frontCardWidth}}>
                <View style={styles.moreOptionsButtonContainer}>
                  <TouchableOpacity onPress={() => this.pressMoreOptions()} style={{alignSelf: 'center'}}>
                    <Image source={require('../../assets/icons/moreOptionsButton.png')}></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </Image>
            <View style={{backgroundColor: this.props.imageBlur, height:this.props.cardHeight, width:2*this.props.frontCardWidth/3, alignSelf:'flex-end'}}>
              <View style={styles.eventInfoContainer}>
                <View style={styles.titleTextContainer}>
                  <Text style={styles.titleText}>{this.props.title.toUpperCase()}</Text>
                </View>
                <View style={styles.tagContainer}>
                  <View style={styles.indiTagContainer}>
                    <Text style={styles.categoryTagText}>{this.props.category}</Text>
                    <Text style={styles.tagText}>{this.props.tags[2]}</Text>
                  </View>
                  <View style={styles.indiTagContainer}>
                    <Text style={styles.tagText}>{this.props.tags[0]}</Text>
                    <Text style={styles.tagText}>{this.props.tags[3]}</Text>
                  </View>
                  <View style={styles.indiTagContainer}>
                    <Text style={styles.tagText}>{this.props.tags[1]}</Text>
                    <Text style={styles.tagText}>{this.props.tags[4]}</Text>
                  </View>
                </View>
                <View style={styles.bottomInfoContainer}>
                  <Text style={styles.bottomInfoText}>{this.props.distance} MILES</Text>
                  <Text style={styles.bottomInfoText}>{this.props.price}</Text>
                  <Text style={styles.bottomInfoText}>{this.props.start_time.toUpperCase()}</Text>
                </View>
              </View>
            </View>
            <View style={styles.rsvpModalContainer}>
              <RSVPModal
                pressMoreOptions={this.pressMoreOptions}
              />
            </View>
          </View>
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <View style={styles.card}>
            <Image source ={{uri: this.props.image}} resizeMode="cover" style={styles.cardImage}>
              <View style={{backgroundColor: this.props.imageBlur, height:this.props.cardHeight, width:this.props.frontCardWidth}}>
                <View style={styles.moreOptionsButtonContainer}>
                  <TouchableOpacity onPress={() => this.pressMoreOptions()} style={{alignSelf: 'center'}}>
                    <Image source={require('../../assets/icons/moreOptionsButton.png')}></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </Image>
            <View style={{backgroundColor: this.props.imageBlur, height:this.props.cardHeight, width:2*this.props.frontCardWidth/3, alignSelf:'flex-end'}}>
              <View style={styles.eventInfoContainer}>
                <View style={styles.titleTextContainer}>
                  <Text style={styles.titleText}>{this.props.title.toUpperCase()}</Text>
                </View>
                <View style={styles.tagContainer}>
                  <View style={styles.indiTagContainer}>
                    <Text style={styles.categoryTagText}>{this.props.category}</Text>
                    <Text style={styles.tagText}>{this.props.tags[2]}</Text>
                  </View>
                  <View style={styles.indiTagContainer}>
                    <Text style={styles.tagText}>{this.props.tags[0]}</Text>
                    <Text style={styles.tagText}>{this.props.tags[3]}</Text>
                  </View>
                  <View style={styles.indiTagContainer}>
                    <Text style={styles.tagText}>{this.props.tags[1]}</Text>
                    <Text style={styles.tagText}>{this.props.tags[4]}</Text>
                  </View>
                </View>
                <View style={styles.bottomInfoContainer}>
                  <Text style={styles.bottomInfoText}>{this.props.distance} MILES</Text>
                  <Text style={styles.bottomInfoText}>{this.props.price}</Text>
                  <Text style={styles.bottomInfoText}>{this.props.start_time.toUpperCase()}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )
    }
  }
}


export default LikedCardFront;
