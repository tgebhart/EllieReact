import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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

import MapView from 'react-native-maps';

const styles = require('./styles');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class LikedList extends Component {
  constructor(props){
    super(props)

    this.state = {
      dataSource: [],
      convoData: ds.cloneWithRows(this.props.likedEvents),
      items: [],
    }
  }

  static contextTypes = {
    store: React.PropTypes.object
  }

  componentWillMount() {
    console.log(this.props)
  }

  eventSummary(x) {
    var colorFade = 'rgba(126, 88, 221, 0.12)'
    var color = 'rgba(126, 88, 221, 1.0)'
    var tags = ['Dancing', 'Open Bar', 'Free Entry', 'Loud', 'Live Music', 5]
    return(
      <View style={styles.eventSummaryContainer}>
        <Swiper>
          <View style={{margin: 5}}>
            <LikedCardFront
            image={x.event.promotionalImages[0]}
            colorFade={colorFade}
            color={color}
            category={x.event.category}
            title={x.event.name}
            dancing={tags[0]}
            volume={tags[1]}
            openbar={tags[2]}
            dress={tags[3]}
            age={tags[4]}
            friends={tags[5]}
            distance={x.distance}
            price={x.event.ticketPrice}
            start_time={x.event.formattedStartTime}
            />
          </View>
            <LikedCardVenue
                latitude={x.event.venue.latitude}
                longitude={x.event.venue.longitude}
                name={x.event.venue.name}
                open={x.event.venue.open}
                phone={x.event.venue.phone}
                infoTags={x.event.venue.infoTags}
              />
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
        <Nav  type = "likedlist" onPress = {() => this.props.navigator.replace({id:'home'})} />
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

LikedList.propTypes = {

  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    likedEvents: state.likeDislike.likedEvents
  }
}

export default connect(mapStateToProps)(LikedList)
