import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

const styles = require('./styles');

class CustomMapMarker extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <View>
          <Text style={styles.customMapMarkerText}>{this.props.name}</Text>
      </View>
    )
  }
}

export default CustomMapMarker;
