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
  TouchableOpacity,
  View
} from 'react-native';

import Nav from './global-widgets/nav'
import SwipeCards from './SwipeCards/SwipeCards.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';
import LinearGradientView from 'react-native-linear-gradient'

var image1 = require('../assets/images/image1.png')
var image2 = require('../assets/images/image2.png')
var image3 = require('../assets/images/image3.png')
var image4 = require('../assets/images/image4.png')
var image5 = require('../assets/images/image5.png')
var image6 = require('../assets/images/image6.png')

const Cards = [{
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

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      cards: Cards
    }
  }
  Card(x){
    return (
      <View style={styles.card}>
        <Image source ={x.image} resizeMode="cover" style={styles.cardImage}>
        <LinearGradientView style={styles.linearGradient} colors={[x.colorFade, x.color]}>
          <View style={{backgroundColor:x.color, marginLeft:140, height:30, width:60, borderBottomLeftRadius:5, borderBottomRightRadius:5, justifyContent:'center', alignItems:'center'}}>
            <Text style={styles.categoryText}>{x.category}</Text>
          </View>
          </LinearGradientView>
        </Image>
        <View style={{flex: 1, backgroundColor: x.color, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: 350}}>
          <Text style={styles.titleText}>{x.title} </Text>
          <View style={styles.tagContainerMaster}>
            <View style={styles.tagContainer}>
              <Text style={{color:'rgba(80,227,194,1.0)', fontSize:16, fontWeight:'bold', margin:5}}>{x.dancing}</Text>
              <Text style={{color:'rgba(255,255,255,1.0)', fontSize:16, fontWeight:'bold', margin:5}}>{x.volume}</Text>
            </View>
            <View style={styles.tagContainer}>
              <Text style={{color:'rgba(80,227,194,1.0)', fontSize:16, fontWeight:'bold', margin:5}}>{x.openbar}</Text>
              <Text style={{color:'rgba(255,255,255,1.0)', fontSize:16, fontWeight:'bold', margin:5}}>{x.dress}</Text>
            </View>
            <View style={styles.tagContainer}>
              <Text style={{color:'rgba(255,255,255,1.0)', fontSize:16, fontWeight:'bold', margin:5}}>{x.age}</Text>
              <Text style={{color:'rgba(255,255,255,1.0)', fontSize:16, fontWeight:'bold', margin:5}}>{x.friends} friends</Text>
            </View>
          </View>
          <View style={styles.bottomInfoContainer}>
            <Text style={styles.bottomInfoText}>{x.distance} miles</Text>
            <Text style={styles.bottomInfoText}>{x.price} </Text>
            <Text style={styles.bottomInfoText}>{x.start_time} </Text>
          </View>
        </View>
      </View>
    )
  }
    handleYup (card) {
    console.log(`Yup for ${card.text}`)
  }

  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  }
  noMore(){
    return (
      <View style={styles.card} >
        <Text>No More Cards</Text>
      </View>
    )
  }

  yup(){
    console.log(this.refs['swiper'])
this.refs['swiper']._goToNextCard()  }

nope(){
    console.log(this.refs['swiper'])
this.refs['swiper']._goToNextCard()  }

  render() {
    return (
      <View style={styles.container}>
          <Nav chat = {() => this.props.navigator.replace({id: "messages"})} toProfile = {() => this.props.navigator.replace({id:'profile'})} />
        <SwipeCards
          ref = {'swiper'}
          cards={this.state.cards}
          containerStyle = {{  backgroundColor: '#f7f7f7', alignItems:'center', margin:20}}
          renderCard={(cardData) => this.Card(cardData)}
          renderNoMoreCards={() => this.noMore()}
          handleYup={this.handleYup}
          handleNope={this.handleNope} />
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity style = {styles.buttons} onPress = {() => this.props.toSearch}>
              <Image name='search' size={30} color="#888" style={{marginTop:0}} source={require('../assets/icons/search.png')} />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.buttons} onPress = {() => this.nope()}>
              <Image name='nope' size={45} color="#888" style={{marginRight:0}} source={require('../assets/icons/dislike.png')} />
            </TouchableOpacity>
            {/* <TouchableOpacity style = {styles.buttonSmall}>
              <Iconz name='ios-information' size={25} color="#888" style={{}} />
            </TouchableOpacity> */}
            <TouchableOpacity style = {styles.buttons} onPress = {() => this.yup()}>
              <Image name='yup' size={45} color="#888" style={{marginLeft:0}} source={require('../assets/icons/like.png')} />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.buttons} onPress = {() => this.props.navigator.replace({id:'likedlist'})}>
              <Image name='likeList' size={30} color="#888" style={{marginTop:0}} source={require('../assets/icons/likeList.png')} />
            </TouchableOpacity>
          </View>
        </View>
    )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  categoryText:{
    color: 'rgba(255,255,255, 0.8)',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'System'
  },
  textContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
  },
  cardImage:{
    height: 275,
    width: 350,
  },
  buttons:{
    width:80,
    height:80,
    borderColor:'#e7e7e7',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:40
  },
  buttonSmall:{
    width:50,
    height:50,
    borderWidth:10,
    borderColor:'#e7e7e7',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25
  },
  titleText:{
    fontFamily: 'System',
    backgroundColor: 'transparent',
    fontSize: 24,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)'
  },
  bottomInfoText:{
    fontSize: 14,
    fontWeight: '400',
    color: 'rgb(255, 255, 255)'
  },
  tagContainerMaster:{
    width: 300,
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  tagContainer:{
    width: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  bottomInfoContainer:{
    width: 330,
    marginTop: 35,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
   card: {
    flex: 1,
    alignItems: 'center',
    alignSelf:'center',
    width: 350,
    height: 450,
    borderRadius: 5,
    shadowRadius: 10,
    shadowOpacity: 1.0,
    shadowColor: 'rgb(0, 0, 0)',
    overflow: 'hidden',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  }

});
