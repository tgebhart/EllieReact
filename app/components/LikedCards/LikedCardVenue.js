import React, { Component } from 'react';

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

import LinearGradientView from 'react-native-linear-gradient'
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';


const theme = getTheme();
const styles = require('./styles');
const homeStyles = require('../Home/styles')

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
      <View style={styles.mapContainer}>
        <MapView style={styles.map}
          initialRegion={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0321
          }}>
          <MapView.Marker
            coordinate={{latitude: this.props.latitude, longitude: this.props.longitude}}
            title={this.props.name}/>
          <LinearGradientView style={homeStyles.linearGradient} colors={['rgba(255, 255, 225, 0.0)','rgba(0, 0, 0, 0.5)']}>
            <View style={styles.venueTitle}>
              <Text style={styles.titleAt}>at</Text>
              <Text style={styles.venueTitleText}>{this.props.name}</Text>
            </View>
          </LinearGradientView>
        </MapView>
        <View style={styles.likedVenueTags}>
          <View style={styles.venueTagColumn}>
            <Icon name="car" size={18} color='rgb(0,0,0)'/>
            <Text style={styles.venueTagText}>Parking</Text>
          </View>
          <View style={styles.venueTagColumn}>
            <Icon name="credit-card" size={18} color='rgb(0,0,0)'/>
            <Text style={styles.venueTagText}>Credit Cards</Text>
          </View>
          <View style={styles.venueTagColumn}>
            <Icon name="glass" size={18} color='rgb(0,0,0)'/>
            <Text style={styles.venueTagText}>Alcohol</Text>
          </View>
          <View style={styles.venueTagColumn}>
            <Icon name="child" size={18} color='rgb(0,0,0)'/>
            <Text style={styles.venueTagText}>For Kids</Text>
          </View>
          <View style={styles.venueTagColumn}>
            <Icon name="users" size={18} color='rgb(0,0,0)'/>
            <Text style={styles.venueTagText}>For Groups</Text>
          </View>
        </View>
        <View style={styles.venueBottomInfo}>
          <Text style={styles.venueBottomText}>Opens at {this.props.open}</Text>
          <Text style={styles.venueBottomText}>{this.props.phone}</Text>
        </View>
      </View>
    )
  }
});

module.exports = LikedCardVenue;
