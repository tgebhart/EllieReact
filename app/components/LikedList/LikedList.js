import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ListView,
  View
} from 'react-native';

import Nav from '../global-widgets/nav'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper';

import LikedCardFront from '../LikedCards/LikedCardFront.js'
import LikedCardMenu from '../LikedCards/LikedCardMenu.js'
import LikedCardVenue from '../LikedCards/LikedCardVenue.js'

import { fetchLikedEvents } from '../../actions/apiActions';

import MapView from 'react-native-maps';

const styles = require('./styles');
import { colorMap } from '../../assets/colors/colorMap';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class LikedList extends Component {
  constructor(props){
    super(props)

    this.state = {
      dataSource: [],
      convoData: ds.cloneWithRows(this.props.likedEvents),
      items: [],
      isLoading: true,
    }
  }

  static contextTypes = {
    store: React.PropTypes.object
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.getLikedEvents()
    this.setState({isLoading: false})
  }

  getLikedEvents = async () => {
    console.log("props likedlist", this.props)
    let { dispatch } = this.props
    var params = {}
    var body = {}
    var additionalParams = {
      headers: {},
      queryParams: {}
    }
    await dispatch(fetchLikedEvents(params, body, additionalParams))
  }

  chopDurationTag(tag) {
    idx = tag.indexOf("hrs") + 3
    return tag.substr(0, idx)
  }

  findAndChopDuration(tags) {
    for (i=0; i < tags.length; i++) {
      if (tags[i].includes("min")) {
        tags[i] = this.chopDurationTag(tags[i])
      }
    }
    return tags
  }

  makeTagList(tags) {
    var ret = ['', '', '', '', '']
    num_tags = tags.num_tags
    if (num_tags >= 5) {
      for (i=0; i < tags.length; i++) {
        ret[i] = tags.tags[i+1]
      }
    }
    if (num_tags == 4) {
      ret[0] = tags.tags[1]
      ret[1] = tags.tags[2]
      ret[2] = tags.tags[3]
      ret[4] = tags.tags[4]
    }
    if (num_tags == 3) {
      ret[1] = tags.tags[1]
      ret[2] = tags.tags[2]
      ret[4] = tags.tags[3]
    }
    if (num_tags == 2) {
      ret[1] = tags.tags[1]
      ret[3] = tags.tags[2]
    }
    if (num_tags == 1) {
      ret[1] = tags.tags[1]
    }
    return this.findAndChopDuration(ret)
  }



  eventSummary(x) {
    var color = colorMap.other.main
    var colorFade = colorMap.other.fade
    var imageBlur = colorMap.other.imblur
    var category = 'Other'
    if (x.event.category) {
      color = colorMap[x.event.category.toLowerCase()].main
      colorFade = colorMap[x.event.category.toLowerCase()].fade
      imageBlur = colorMap[x.event.category.toLowerCase()].imblur
    }
    var tags = this.makeTagList(x.event.tags)
    var sysWidth = Dimensions.get('window').width;
    var sysHeight = Dimensions.get('window').height;
    var cardHeight = sysHeight / 4 - 20;
    var buffer = 15;
    var frontCardWidth = sysWidth - buffer;
    var venueCardWidth = sysWidth - buffer;
    return(
      <View style={styles.eventSummaryContainer}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{marginBottom:0}}
          showsHorizontalScrollIndicator={false}>
          <LikedCardFront
              image={x.event.promotionalImages[0]}
              imageBlur={imageBlur}
              colorFade={colorFade}
              color={color}
              category={x.event.category}
              title={x.event.name}
              tags={tags}
              distance={x.distance}
              price='$15'//x.event.ticketPrice
              start_time={x.event.formattedStartTime}
              facebook_event_id={x.event.facebook_event_id}
              frontCardWidth={frontCardWidth}
              cardHeight={cardHeight}
            />
          <LikedCardVenue
              latitude={x.event.venue.latitude}
              longitude={x.event.venue.longitude}
              name={x.event.venue.name}
              open={x.event.venue.open}
              phone={x.event.venue.phone}
              infoTags={x.event.venue.infoTags}
              venueCardWidth={venueCardWidth}
              cardHeight={cardHeight}
              imageBlur={imageBlur}
              rating={x.event.venue.yelpRating}
          />
        </ScrollView>
      </View>
  )}

  renderCards(x) {
    return(
        <LikedCardFront>
        </LikedCardFront>
    )
  }

  render() {
    if (this.state.isLoading) {
      return <View style={{flex: 1, alignItems: 'center', marginTop: 300}}><Text>Loading Awesomeness ... </Text></View>
    }
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
    likedEvents: state.likeDislike.likedEvents,
    events: state.likedEventsGet.events,
  }
}

export default connect(mapStateToProps)(LikedList)
