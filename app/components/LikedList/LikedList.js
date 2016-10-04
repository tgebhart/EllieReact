/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {

  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ListView,
  View
} from 'react-native';

import {
  MKButton,
  MKColor,
  MKIconToggle,
  getTheme,
} from 'react-native-material-kit';

import Nav from '../global-widgets/nav'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper';

import LikedCardFront from '../LikedCards/LikedCardFront.js'
import LikedCardMenu from '../LikedCards/LikedCardMenu.js'
import LikedCardVenue from '../LikedCards/LikedCardVenue.js'

var image1 = require('../../assets/images/image1.png')
var image2 = require('../../assets/images/image2.png')
var image3 = require('../../assets/images/image3.png')
var image4 = require('../../assets/images/image4.png')
var image5 = require('../../assets/images/image5.png')
var image6 = require('../../assets/images/image6.png')
var image7 = require('../../assets/images/image7.png')
var image8 = require('../../assets/images/image8.png')
var image9 = require('../../assets/images/image9.png')
var image10 = require('../../assets/images/image10.png')
var image11 = require('../../assets/images/image11.png')

const events = [{
  "id": 1,
  "title": "Set Up",
  "category": "Comedy",
  "age": "21+",
  "dancing": "Dancing",
  "openbar": "Open Bar",
  "volume": "Quiet",
  "dress": "Casual",
  "friends": 5,
  "image": image1,
  "color": 'rgba(126, 88, 221, 1.0)',
  "colorFade" : 'rgba(126, 88, 221, 0.12)',
  "distance": 1.1,
  "price": "$15",
  "start_time": "Thursday, 8:00pm"
}, {
  "id": 2,
  "title": "Fall Into Diversity",
  "category": "Social",
  "age": "All Ages",
  "dancing": "Diversity",
  "openbar": "Open Bar",
  "volume": "Quiet",
  "dress": "Casual",
  "friends": 10,
  "image": image2,
  "color": 'rgba(221, 83, 149, 1.0)',
  "colorFade": 'rgba(221, 83, 149, 0.12)',
  "distance": 2.1,
  "price": "$25",
  "start_time": "Friday, 8:00pm"
}, {
  "id": 3,
  "title": "DanceFridays",
  "category": "Party",
  "age": "18+",
  "dancing": "Dancing",
  "openbar": "Open Bar",
  "volume": "Loud",
  "dress": "Dress Code",
  "friends": 2,
  "image": image3,
  "color": 'rgba(81, 136, 219, 1.0)',
  "colorFade": 'rgba(81, 136, 219, 0.12)',
  "distance": 0.8,
  "price": "$10",
  "start_time": "Friday, 10:00pm"
}, {
  "id": 4,
  "title": "The Russian Party",
  "category": "Party",
  "age": "All Ages",
  "dancing": "Music",
  "openbar": "Open Bar",
  "volume": "Loud",
  "dress": "Casual",
  "friends": 3,
  "image": image4,
  "color": 'rgba(221, 109, 83, 1.0)',
  "colorFade": 'rgba(221, 109, 83, 0.12)',
  "distance": 1.8,
  "price": "Free",
  "start_time": "Saturday, 9:00pm"
}, {
  "id": 5,
  "title": "Techno Awakening",
  "category": "Party",
  "age": "21+",
  "dancing": "Comedy",
  "openbar": "Open Bar",
  "volume": "Loud",
  "dress": "Dress Code",
  "friends": 10,
  "image": image5,
  "color": 'rgba(126, 88, 221, 1.0)',
  "colorFade": 'rgba(126, 88, 221, 0.12)',
  "distance": 1.9,
  "price": "$5",
  "start_time": "Friday, 9:00pm"
}, {
  "id": 6,
  "title": "Young Cali Takeover",
  "category": "Party",
  "age": "18+",
  "dancing": "Dancing",
  "openbar": "Open Bar",
  "volume": "Loud",
  "dress": "Casual",
  "friends": 5,
  "image": image6,
  "color": 'rgba(221, 83, 149, 1.0)',
  "colorFade": 'rgba(221, 83, 149, 0.12)',
  "distance": 1.4,
  "price": "$5",
  "start_time": "Thursday, 11:00pm"
}]

var newMatches = [{
  "id": 1,
  "first_name": "Sarah",
  "image" : image7
}, {
  "id": 2,
  "first_name": "Pamela",
  "image" : image8
}, {
  "id": 3,
  "first_name": "Diana",
  "image" : image9
}, {
  "id": 4,
  "first_name": "Christina",
  "image" : image10
}, {
  "id": 5,
  "first_name": "Rebecca",
  "image" : image11
}, {
  "id": 6,
  "first_name": "Wanda",
  "image" : image5
}, {
  "id": 7,
  "first_name": "Sara",
  "image" : image6
}, {
  "id": 8,
  "first_name": "Judith",
  "image" : image7
}, {
  "id": 9,
  "first_name": "Ruby",
  "image" : image1
}, {
  "id": 10,
  "first_name": "Sandra",
  "image" : image11
}]

import MapView from 'react-native-maps';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class LikedList extends Component {
  constructor(props){
    super(props)

    this.state = {
      dataSource: ds.cloneWithRows(newMatches),
      convoData: ds.cloneWithRows(events),
      items: [],
    }
  }

  eventSummary(x) {
    return(
      <View style={styles.eventSummaryContainer}>
        <Swiper>
          <View >
            <LikedCardFront
            image={x.image}
            colorFade={x.colorFade}
            color={x.color}
            category={x.category}
            title={x.title}
            dancing={x.dancing}
            volume={x.volume}
            openbar={x.openbar}
            dress={x.dress}
            age={x.age}
            friends={x.friends}
            distance={x.distance}
            price={x.price}
            start_time={x.start_time}
            />
          </View>
          <View>
            <LikedCardVenue></LikedCardVenue>
          </View>
        </Swiper>
      </View>
  )}

  renderCards(x) {
    return(
      <View style={styles.eventCard}>
        <LikedCardFront>
        </LikedCardFront>
      </View>
    )
  }

  render() {
    return (
      <View style = {{flex:1}}>
        <Nav type = 'likedlist' onPress = {() => this.props.navigator.replace({id:'home'})} />
        <ListView
          horizontal={false}
          scrollEnabled = {true}
          showsHorizontalScrollIndicator = {false}
          dataSource={this.state.convoData}
          pageSize = {2}
          renderRow={(rowData) =>this.eventSummary(rowData)} >
        </ListView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0
  },
  matches:{
  borderTopColor:'#da533c',
  borderBottomColor:'#e3e3e3'
  },
  eventCard: {
    flex: 1,
    width: 300,
    height: 300
  },
  eventSummaryContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 300,
  },

});
