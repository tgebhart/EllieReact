import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  PermissionsAndroid,
  View,
  Modal,
  ScrollView,
  Dimensions,
  Animated,
  ListView,
  Platform
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

import { connect } from 'react-redux';

// import { requestPermission } from 'react-native-android-permissions';

import Nav from '../global-widgets/nav';
import SwipeCards from '../SwipeCards/SwipeCards.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconfa from 'react-native-vector-icons/FontAwesome';
import Iconz from 'react-native-vector-icons/Ionicons';
import LinearGradientView from 'react-native-linear-gradient';
import FlipCard from 'react-native-flip-card';

const { BlurView, VibrancyView } = require('react-native-blur');

import { fetchEventsIfNeeded, postLikedEvent } from '../../actions/apiActions';
import { handleEventInteraction } from '../../actions/userEventActions';
import { fetchUserProfile } from '../../actions/facebookActions';

import SearchModal from './SearchModal';

const styles = require('./styles');
import { colorMap } from '../../assets/colors/colorMap';

const nightOutImage = require('../../assets/images/night_out.png');
const dayOutImage = require('../../assets/images/day_out.png');
const afterWorkImage = require('../../assets/images/after_work.png');
const exploreImage = require('../../assets/images/explore.png');
const hereAndNowImage = require('../../assets/images/here_and_now.png');

const searchDays = ['TODAY', 'TOMORROW', 'WEEKEND', 'NEXT WEEK', 'NEXT WEEKEND'];
const useCases = [{'name':'Night Out', 'image': nightOutImage}, {'name':'Day Out', 'image': dayOutImage},
                  {'name':'After Work', 'image': afterWorkImage}, {'name':'Explore', 'image': exploreImage},
                  {'name':'Here and Now', 'image': hereAndNowImage}]

class Home extends Component {
  constructor(props){
    super(props)
    this.renderTimeRow = this.renderTimeRow.bind(this);
    this.selectSearchTime = this.selectSearchTime.bind(this);
    this.renderUseCaseRow = this.renderUseCaseRow.bind(this);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      searchTimes: this.ds.cloneWithRows(searchDays),
      searchUseCases: this.ds.cloneWithRows(useCases),
      searchVisible: false,
      initialPosition: undefined,
      cards: undefined,
      user: undefined,
      selectedSearchTime: 'TODAY',
      selectedUseCase: 'Explore'
    }
  }

  static contextTypes = {
    store: React.PropTypes.object
  }

  componentWillMount() {}

  componentDidMount() {
    this.setState({cards: this.props.events, user: this.props.user})

    if (Platform.OS === 'ios') {
      navigator.geolocation.getCurrentPosition(
       (position) => {
         this.setState({ initialPosition: { latitude: position.coords.latitude, longitude: position.coords.longitude }});
       },
       (error) => alert(JSON.stringify(error)),
       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
     );
    }
    else {
        PermissionsAndroid.requestPermission(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Ellie Location Access',
            'message': 'Ellie needs access to your location to find events near you!'
          }
        ).then((result) => {
          navigator.geolocation.getCurrentPosition(
           (position) => {
             this.setState({ initialPosition: { latitude: position.coords.latitude, longitude: position.coords.longitude }});
           },
           (error) => alert(JSON.stringify(error)),
           {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
         );
            }, (result) => {
              console.log("Not Granted!");
              console.log(result);
            });
      }
    }

 distance(lat1, lon1, lat2, lon2) {
   var p = 0.017453292519943295;    // Math.PI / 180
   var c = Math.cos;
   var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

   return Math.round(12742 * Math.asin(Math.sqrt(a)) * 0.621371 *10)/10; // 2 * R * mi_to_km * 10 for formatting; R = 6371 km
  }

  getStartTimeFormat(startTime) {
    var num_to_day = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    }
    let date = new Date(startTime*1000)
    date.setHours(date.getHours() + 6) // timezone to PDT from weird GMT conversion (fix on backend)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let dow = date.getDay()
    let day = date.getDate()
    let now = new Date()

    var prefix = ''

    if (day - now.getDate() > 6) {
      return date.getMonth() + '/' + day + " " + date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    }
    //
    // if (day - now.getDate() > 6) {
    //   prefix = 'Next '
    // }

    return prefix + num_to_day[dow] + " " + date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

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


  Card(x){

    if (this.state.initialPosition !== undefined) {
      var currentLat = this.state.initialPosition.latitude
      var currentLong = this.state.initialPosition.longitude
      var distance = this.distance(currentLat, currentLong, x.venue.latitude, x.venue.longitude)
      x.distance = distance
    }

    x.showTime = Date.now() / 1000; //divide by 1000 for seconds
    x.flipped = false

    x.formattedStartTime = this.getStartTimeFormat(x.startTime)

    var color = colorMap.other.main
    var colorFade = colorMap.other.fade
    var category = 'Other'
    if (x.category) {
      color = colorMap[x.category.toLowerCase()].main
      colorFade = colorMap[x.category.toLowerCase()].fade
    }
    var tags = this.makeTagList(x.tags)
    return (
      <FlipCard
        style={styles.flipCard}
        friction={20}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={false}
        flip={false}
        clickable={true}
        onFlipped={(isFlipped)=>{x.flipped = true}}>
      <View style={styles.shadowContainer}>
        <View style={styles.card}>
          <Image source ={{uri: x.promotionalImages[0]}} resizeMode="cover" style={styles.cardImage}>
            <LinearGradientView style={styles.linearGradient} colors={[colorFade, color]}/>
          </Image>
          <View style={{flex: 1, backgroundColor:color, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: 350}}>
            <View style={styles.titleTextContainer}>
              <Text style={styles.titleText} numberOfLines={2}>{x.name}</Text>
            </View>
            <View style={styles.tagContainerMaster}>
              <View style={styles.tagContainer}>
                <Text style={{color:'rgba(0,0,0,1.0)', fontSize:16, fontWeight:'bold', padding:5}}>{x.category}</Text>
                <Text style={{color:'rgba(0,0,0,1.0)', fontSize:16, fontWeight:'400', padding:5}}>{tags[2]}</Text>
              </View>
              <View style={styles.tagContainer}>
                <Text style={{color:'rgba(0,0,0,1.0)', fontSize:16, fontWeight:'400', padding:5}}>{tags[0]}</Text>
                <Text style={{color:'rgba(0,0,0,1.0)', fontSize:16, fontWeight:'400', padding:5}}>{tags[3]}</Text>
              </View>
              <View style={styles.tagContainer}>
                <Text style={{color:'rgba(0,0,0,1.0)', fontSize:16, fontWeight:'400', padding:5}}>{tags[1]}</Text>
                <Text style={{color:'rgba(0,0,0,1.0)', fontSize:16, fontWeight:'400', padding:5}}>{tags[4]}</Text>
              </View>
            </View>
            <View style={styles.bottomInfoContainer}>
              <Text style={styles.bottomInfoText}>{x.distance} miles</Text>
              <Text style={styles.bottomInfoText}>$$</Text>
              <Text style={styles.bottomInfoText}>{x.formattedStartTime}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.shadowContainer}>
        <View style={styles.card}>
          <View style={{ alignItems: 'center', backgroundColor:color, alignSelf:'center', width: 350, height: 450}}>
            <View style={{alignItems: 'center', backgroundColor:color, padding:10}}>
              <Text style={styles.descriptionTitle}>{x.name}</Text>
            </View>
            <ScrollView contentContainerStyle={{flex: 1, backgroundColor:color, padding:25, alignItems: 'center', alignSelf: 'center', height:300}} horizontal={false} >
              <Text style={styles.descriptionText}>{x.description}</Text>
            </ScrollView>
            <View style={{alignItems: 'center', alignSelf: 'center', backgroundColor:color}}>
              <Image source={require('../../assets/icons/flip.png')}></Image>
            </View>
          </View>
        </View>
      </View>
    </FlipCard>
    )
  }

  handleYup(card) {
    let { dispatch } = this.props
    dispatch(handleEventInteraction(card, card.flipped, card.showTime, Date.now(), card.distance, true))
    dispatch(postLikedEvent(card))
    dispatch(fetchEventsIfNeeded())
  }

  handleNope(card) {
    let { dispatch } = this.props
    dispatch(handleEventInteraction(card, card.flipped, card.showTime, Date.now(), card.distance, false))
    dispatch(fetchEventsIfNeeded())
  }

  noMore(){
    return (
      <View style={styles.card} >
        <Text>No More Events</Text>
      </View>
    )
  }

  yup() {
    this.handleYup(this.refs.swiper.state.card)
    this.refs['swiper']._goToNextCard()
  }

  nope() {
    this.handleNope(this.refs.swiper.state.card)
    this.refs['swiper']._goToNextCard()
  }

  setSearchVisible(visible) {
    this.setState({searchVisible: visible});
  }

  renderTimeRow(time) {
    const isTimeSelected = this.state.selectedSearchTime == time;
    const searchTimeTextStyle = isTimeSelected ?
      styles.selectedSearchTimeText : styles.searchTimeText;
    return (
      <TouchableHighlight onPress={ () => this.selectSearchTime(time) }>
        <Text style={searchTimeTextStyle}>{time}</Text>
      </TouchableHighlight>
    )
  }

  selectSearchTime(time) {
    this.setState({selectedSearchTime: time, searchTimes: this.ds.cloneWithRows(searchDays.slice())})
  }

  renderUseCaseRow(useCase) {
    const isUseCaseSelected = this.state.selectedUseCase == useCase.name;
    if (isUseCaseSelected) {
      return (
        <TouchableOpacity onPress={ () => this.selectUseCase(useCase) } style={{paddingLeft: 5, paddingRight: 5}}>
          <Image source={useCase.image} style={styles.useCaseImage}><Text style={styles.useCaseTextSelected}>{useCase.name}</Text></Image>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onPress={ () => this.selectUseCase(useCase) } style={{paddingLeft: 5, paddingRight: 5}}>
        <Image source={useCase.image} style={styles.useCaseImage}><View style={styles.useCaseImageBlur}><Text style={styles.useCaseText}>{useCase.name}</Text></View></Image>
      </TouchableOpacity>
    )
  }

  selectUseCase(useCase) {
    this.setState({selectedUseCase: useCase.name, searchUseCases: this.ds.cloneWithRows(useCases.slice())})
  }

  render() {
    var sysWidth = Dimensions.get('window').width
    var sysHeight = Dimensions.get('window').height

    return (
      <View style={styles.container}>
        <Nav picture_url={this.props.user.picture_url} name={this.props.user.name} />

        <SwipeCards
          ref = {'swiper'}
          cards={this.props.events}
          containerStyle = {styles.swipeCardContainer}
          renderCard={(cardData) => this.Card(cardData)}
          renderNoMoreCards={() => this.noMore()}
          handleYup={this.handleYup}
          loop={false}
          dispatch = {this.props.dispatch}
          handleNope={this.handleNope}>
        </SwipeCards>

          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginBottom:30, backgroundColor:'#FFFFFF'}}>
            <TouchableOpacity style = {styles.buttons} onPress = {() => this.setSearchVisible(true)}>
              <Image name='search' size={30} color="#888" style={{marginTop:0}} source={require('../../assets/icons/search.png')} />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.buttons} onPress = {() => this.nope()}>
              <Image name='nope' size={45} color="#888" style={{marginRight:0}} source={require('../../assets/icons/dislike.png')} />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.buttons} onPress = {() => this.yup()}>
              <Image name='yup' size={45} color="#888" style={{marginLeft:0}} source={require('../../assets/icons/like.png')} />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.buttons} onPress = {() => this.props.navigator.replace({id:'likedlist'})}>
              <Image name='likeList' size={30} color="#888" style={{marginTop:0}} source={require('../../assets/icons/likeList.png')} />
            </TouchableOpacity>
          </View>

          {/* <View style={styles.searchContainer}> */}
            <Modal
              animationType={"slide"}
              transparent={true}
              visible={this.state.searchVisible}
              onRequestClose={() => {console.log("Modal has been closed.")}}
              >
              <SearchModal
                searchTimes={this.state.searchTimes}
                renderTimeRow={this.renderTimeRow}
                useCases={this.state.searchUseCases}
                renderUseCaseRow={this.renderUseCaseRow}
              />
            </Modal>
        </View>

    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    events: state.eventsGet.events,
    user: state.getUserProfile
  }
}

export default connect(mapStateToProps)(Home)
