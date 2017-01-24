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


import LinearGradientView from 'react-native-linear-gradient'
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

import VenueStarRating from './VenueStarRating';
import RSVPModal from './RSVPModal';

const styles = require('./styles');


class LikedCardVenue extends Component {
  constructor(props) {
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
                   <TouchableOpacity style={{paddingTop: 5}} onPress={ () => this.pressMoreOptions()}>
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
        <View style={styles.rsvpModalContainer}>
          <RSVPModal
            pressMoreOptions={this.pressMoreOptions}
          />
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
          longitude: this.props.longitude - 0.025,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0321
        }}
        liteMode={true}>
        <MapView.Marker coordinate={{latitude: this.props.latitude, longitude: this.props.longitude}}>
        </MapView.Marker>
        <View style={{width: this.props.venueCardWidth, height: this.props.cardHeight, flex:1}}>
        <View style={{width: this.props.venueCardWidth/2, height:this.props.cardHeight, backgroundColor: this.props.imageBlur}}>
          <View style={styles.venueInfoContainer}>
             <View style={styles.venueTitleContainer}>
               <Text style={styles.venueTitleText}>{this.props.name.toUpperCase()}</Text>
             </View>
             <View style={styles.tagAndButtonContainer}>
               <View style={styles.moreOptionsButtonContainer}>
                 <TouchableOpacity style={{paddingTop: 5}} onPress={ () => this.pressMoreOptions()}>
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
        <View style={styles.mapOverlayContainer}>
          <View style={styles.venuePhoneContainer}>
            <Text style={styles.svenuePhoneText}>{this.props.phone}</Text>
          </View>
        </View>
      </View>
      </MapView>

    </View>

    )
  }


}

export default LikedCardVenue;
