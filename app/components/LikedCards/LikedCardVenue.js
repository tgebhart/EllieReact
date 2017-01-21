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

import CustomMapMarker from './CustomMapMarker';

import LinearGradientView from 'react-native-linear-gradient'
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

import VenueStarRating from './VenueStarRating';

const styles = require('./styles');
const homeStyles = require('../Home/styles')

class LikedCardVenue extends Component {
  constructor(props) {
    super(props)
  }



  render() {
    return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: this.props.latitude,
          longitude: this.props.longitude - 0.025,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0321
        }}
        liteMode={true}>
        <MapView.Marker coordinate={{latitude: this.props.latitude, longitude: this.props.longitude}}>
        </MapView.Marker>
        <View style={{width: this.props.venueCardWidth/2, backgroundColor: this.props.imageBlur, flex:1}}>
          <View style={styles.venueInfoContainer}>
             <View style={styles.venueTitleContainer}>
               <Text style={styles.venueTitleText}>{this.props.name.toUpperCase()}</Text>
             </View>
             <View style={styles.tagAndButtonContainer}>
               <View style={styles.moreOptionsButtonContainer}>
                 <TouchableOpacity style={{paddingTop: 5}}>
                   <Image source={require('../../assets/icons/moreOptionsButton.png')}></Image>
                 </TouchableOpacity>
               </View>
               <View style={styles.moreInfoContainer}>

               </View>
             </View>
             <View style={styles.venueBottomInfo}>
                <VenueStarRating
                  rating={this.props.rating}
                />
             </View>
          </View>
        </View>
      </MapView>

    </View>

    )
  }


}

export default LikedCardVenue;
