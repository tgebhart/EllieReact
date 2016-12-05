import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Platform,
} from 'react-native';

import CustomMapMarker from './CustomMapMarker';

import LinearGradientView from 'react-native-linear-gradient'
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';


const styles = require('./styles');
const homeStyles = require('../Home/styles')

class LikedCardVenue extends Component {
  constructor(props){
    super(props)
  }


  render(){
    if (Platform.OS === 'ios') {
      return (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: this.props.latitude,
              longitude: this.props.longitude,
              latitudeDelta: 0.0322,
              longitudeDelta: 0.0321
            }}
            liteMode={true}>
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
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0321
        }}
        liteMode={true}>
        <MapView.Marker coordinate={{latitude: this.props.latitude, longitude: this.props.longitude}}>
          {/* <CustomMapMarker name={this.props.name}/> */}
        </MapView.Marker>
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


}

export default LikedCardVenue;
