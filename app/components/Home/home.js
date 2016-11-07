import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  Dimensions,
  Animated,
  ListView,
  Platform
} from 'react-native';

import { connect } from 'react-redux';

import { requestPermission } from 'react-native-android-permissions';

import Nav from '../global-widgets/nav';
import SwipeCards from '../SwipeCards/SwipeCards.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';
import LinearGradientView from 'react-native-linear-gradient';
import FlipCard from 'react-native-flip-card';
const { BlurView, VibrancyView } = require('react-native-blur');

import { fetchEventsIfNeeded, postLikedEvent } from '../../actions/apiActions'
import { handleEventInteraction } from '../../actions/userEventActions'

const styles = require('./styles');

class Home extends Component {
  constructor(props){
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      searchTimes: ds.cloneWithRows([
        'TODAY', 'TOMORROW', 'WEEKEND', 'NEXT WEEK', 'NEXT WEEKEND']),
      searchCities: ds.cloneWithRows([
        'SAN FRANCISCO', 'NEARBY']),
      searchVisible: false,
      initialPosition: undefined,
      cards: undefined
    }
  }

  static contextTypes = {
    store: React.PropTypes.object
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.setState({cards: this.props.events})

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
      requestPermission("android.permission.ACCESS_FINE_LOCATION").then((result) => {
        console.log("Granted!", result);
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
        // for the correct StatusBar behaviour with translucent={true} we need to wait a bit and ask for permission after the first render cycle
        // (check https://github.com/facebook/react-native/issues/9413 for more info
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

    if (day - now.getDate() > 12) {
      return date.getMonth() + '/' + day + " " + date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    }

    if (day - now.getDate() > 6) {
      prefix = 'Next '
    }

    return prefix + num_to_day[dow] + " " + date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

  }


  Card(x){

    if (this.state.initialPosition !== undefined) {
      var currentLat = this.state.initialPosition.latitude
      var currentLong = this.state.initialPosition.longitude
      var distance = this.distance(currentLat, currentLong, x.venue.latitude, x.venue.longitude)
      x.distance = distance
    }

    x.showTime = Date.now()
    x.flipped = false

    x.formattedStartTime = this.getStartTimeFormat(x.startTime)

    var colorFade = 'rgba(126, 88, 221, 0.12)'
    var color = 'rgba(126, 88, 221, 1.0)'
    var tags = ['Dancing', 'Open Bar', 'Free Entry', 'Loud', 'Live Music', 5]
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
          <LinearGradientView style={styles.linearGradient} colors={[colorFade, color]}>
            <View style={{backgroundColor:x.color, marginLeft:140, height:30, width:60, borderBottomLeftRadius:5, borderBottomRightRadius:5, justifyContent:'center', alignItems:'center'}}>
              <Text style={styles.categoryText}>{x.category}</Text>
            </View>
            </LinearGradientView>
          </Image>
          <View style={{flex: 1, backgroundColor:color, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: 350}}>
            <View style={styles.titleTextContainer}>
              <Text style={styles.titleText} numberOfLines={3}>{x.name} </Text>
            </View>
            <View style={styles.tagContainerMaster}>
              <View style={styles.tagContainer}>
                <Text style={{color:'rgba(80,227,194,1.0)', fontSize:16, fontWeight:'bold', margin:5}}>{tags[0]}</Text>
                <Text style={{color:'rgba(255,255,255,1.0)', fontSize:16, fontWeight:'bold', margin:5}}>{tags[1]}</Text>
              </View>
              <View style={styles.tagContainer}>
                <Text style={{color:'rgba(80,227,194,1.0)', fontSize:16, fontWeight:'bold', margin:5}}>{tags[2]}</Text>
                <Text style={{color:'rgba(255,255,255,1.0)', fontSize:16, fontWeight:'bold', margin:5}}>{tags[3]}</Text>
              </View>
              <View style={styles.tagContainer}>
                <Text style={{color:'rgba(255,255,255,1.0)', fontSize:16, fontWeight:'bold', margin:5}}>{tags[4]}</Text>
                <Text style={{color:'rgba(255,255,255,1.0)', fontSize:16, fontWeight:'bold', margin:5}}>{tags[5]} friends</Text>
              </View>
            </View>
            <View style={styles.bottomInfoContainer}>
              <Text style={styles.bottomInfoText}>{x.distance} miles</Text>
              <Text style={styles.bottomInfoText}>{x.ticketPrice} </Text>
              <Text style={styles.bottomInfoText}>{x.formattedStartTime} </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.shadowContainer}>
        <View style={styles.card}>
          <View style={{flex: 1, alignItems: 'center', backgroundColor:color, alignSelf:'center', width: 350, height: 450,}}>
            <View style={{flex: 1, alignItems: 'center', backgroundColor:color, padding:10}}>
              <Text style={styles.descriptionTitle}>{x.name}</Text>
            </View>
            <View style={{flex: 1, backgroundColor:color, padding:25, alignItems: 'center', alignSelf: 'center', height:300}}>
            <ScrollView horizontal={false} >
              <Text style={styles.descriptionText}>{x.description}</Text>
            </ScrollView>
            </View>
            <View style={{flex: 1, alignItems: 'center', alignSelf: 'center', backgroundColor:color}}>
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
        <Text>No More Cards</Text>
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

  render() {
    var sysWidth = Dimensions.get('window').width
    var sysHeight = Dimensions.get('window').height

    return (
      <View style={styles.container}>
        <Nav chat = {() => this.props.navigator.replace({id: "messages"})} toProfile = {() => this.props.navigator.replace({id:'profile'})} />

        <SwipeCards
          ref = {'swiper'}
          cards={this.props.events}
          containerStyle = {{backgroundColor: '#f7f7f7', alignItems:'center', margin:20, height:450}}
          renderCard={(cardData) => this.Card(cardData)}
          renderNoMoreCards={() => this.noMore()}
          handleYup={this.handleYup}
          loop={false}
          dispatch = {this.props.dispatch}
          handleNope={this.handleNope}>
          </SwipeCards>

          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
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
              onRequestClose={() => {alert("Modal has been closed.")}}
              >
              <View style={{height: sysHeight, width: sysWidth}}>
                <TouchableOpacity style={{height: sysHeight-350, backgroundColor:'rgba(0,0,0,0.4)'}} onPress = {() => this.setSearchVisible(false)}>
                </TouchableOpacity>
              <View style={styles.shadowContainer}>
                <View style={{height: 350, marginRight: 100,
                  marginLeft: 10, width: sysWidth - 20, shadowOpacity: 5.0, elevation: 5,
                  borderRadius: 5, overflow:'hidden', backgroundColor: 'rgb(255,255,255)'}}>
                  <ScrollView
                  horizontal={true}
                  >
                  <ListView
                  contentContainerStyle={styles.searchTimeContainer}
                  horizontal={true}
                  scrollEnabled={true}
                  showHorizontalScrollIndicator={true}
                  dataSource={this.state.searchTimes}
                  renderRow={(rowData) => <TouchableOpacity><Text style={styles.searchTimeText}>{rowData}</Text></TouchableOpacity>}
                  />
                  </ScrollView>
                <View style={styles.searchCategoryContainer}>
                  <TouchableOpacity style={styles.concertTag}>
                    <Text style={styles.categoryTagText}>Concert</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.comedyTag}>
                    <Text style={styles.categoryTagText}>Comedy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.communityTag}>
                    <Text style={styles.categoryTagText}>Community</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.partyTag}>
                    <Text style={styles.categoryTagText}>Party</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.theaterTag}>
                    <Text style={styles.categoryTagText}>Theater</Text>
                  </TouchableOpacity>
                </View>
                <ListView
                contentContainerStyle={styles.searchCityContainer}
                horizontal={true}
                scrollEnabled={true}
                showHorizontalScrollIndicator={true}
                dataSource={this.state.searchCities}
                renderRow={(rowData) => <TouchableOpacity><Text style={styles.searchCityText}>{rowData}</Text></TouchableOpacity>}
                />
                <TouchableOpacity style={styles.searchButtonContainer}>
                    <Icon name="search" height="24" color="rgb(0,0,0)" size={24}/>
                    <Text style={styles.searchButtonText}>SEARCH</Text>
                </TouchableOpacity>
                </View>

              </View>
              </View>
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
    events: state.eventsGet.events
  }
}

export default connect(mapStateToProps)(Home)
