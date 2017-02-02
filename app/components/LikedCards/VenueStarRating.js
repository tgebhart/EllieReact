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

import Icon from 'react-native-vector-icons/FontAwesome';

const styles = require('./styles');

class VenueStarRating extends Component {
  constructor(props) {
    super(props)
  }



  render() {
    rating = Math.floor(this.props.rating)
    if (rating == 1) {
      return (
        <View style={styles.venueRatingContainer}>
          <Icon name="star" style={styles.venueRatingStar}/>
        </View>
      )
    }
    if (rating == 2) {
      return (
        <View style={styles.venueRatingContainer}>
          <Icon name="star" style={styles.venueRatingStar}/>
          <Icon name="star" style={styles.venueRatingStar}/>
        </View>
      )
    }
    if (rating == 3) {
      return (
        <View style={styles.venueRatingContainer}>
          <Icon name="star" style={styles.venueRatingStar}/>
          <Icon name="star" style={styles.venueRatingStar}/>
          <Icon name="star" style={styles.venueRatingStar}/>
        </View>
      )
    }
    if (rating == 4) {
      return (
        <View style={styles.venueRatingContainer}>
          <Icon name="star" style={styles.venueRatingStar}/>
          <Icon name="star" style={styles.venueRatingStar}/>
          <Icon name="star" style={styles.venueRatingStar}/>
          <Icon name="star" style={styles.venueRatingStar}/>
        </View>
      )
    }
    if (rating == 5) {
      return (
        <View style={styles.venueRatingContainer}>
          <Icon name="star" style={styles.venueRatingStar}/>
          <Icon name="star" style={styles.venueRatingStar}/>
          <Icon name="star" style={styles.venueRatingStar}/>
          <Icon name="star" style={styles.venueRatingStar}/>
          <Icon name="star" style={styles.venueRatingStar}/>
        </View>
      )
    }
    return (
      <View style={styles.venueRatingContainer}>
      </View>
    )
  }


}

export default VenueStarRating;
