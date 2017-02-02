import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ListView,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';

import Iconfa from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = require('./styles');

var sysWidth = Dimensions.get('window').width
var sysHeight = Dimensions.get('window').height

class SearchModal extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <View style={{height: sysHeight, width: sysWidth}}>
        <TouchableOpacity style={{height: sysHeight-350, backgroundColor:'rgba(0,0,0,0.4)'}} onPress = {() => this.setSearchVisible(false)}>
        </TouchableOpacity>
      <View style={styles.shadowContainer}>
        <View style={{height: 350, marginRight: 100,
          marginLeft: 10, width: sysWidth - 20, shadowOpacity: 5.0, elevation: 5,
          borderRadius: 5, overflow:'hidden', backgroundColor: 'rgb(255,255,255)'}}>
          <ListView
            contentContainerStyle={styles.searchTimeContainer}
            horizontal={true}
            scrollEnabled={true}
            showHorizontalScrollIndicator={false}
            dataSource={this.props.searchTimes}
            renderRow={this.props.renderTimeRow}
          />
          <ListView
            contentContainerStyle={styles.searchUseCaseContainer}
            horizontal={true}
            scrollEnabled={true}
            showHorizontalScrollIndicator={false}
            dataSource={this.props.useCases}
            renderRow={this.props.renderUseCaseRow}
          />
        <TouchableOpacity style={styles.searchMoreFiltersContainer} onPress={() => console.log('pressed. Implement animation to more filters here')}>
          <View style={styles.circleIconContainer}>
            <Iconfa name="circle" size={10} color='rgb(0,0,0)' style={{margin:3}}/>
            <Iconfa name="circle" size={10} color='rgb(0,0,0)' style={{margin:3}}/>
            <Iconfa name="circle" size={10} color='rgb(0,0,0)' style={{margin:3}}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButtonContainer}>
            <Icon name="search" height="24" color="rgb(0,0,0)" size={24}/>
            <Text style={styles.searchButtonText}>FIND</Text>
        </TouchableOpacity>
        </View>
      </View>
      </View>
    )
  }

}

export default SearchModal;
