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

var image1 = require('../assets/images/image1.png')
var image2 = require('../assets/images/image2.png')
var image3 = require('../assets/images/image3.png')
var image4 = require('../assets/images/image4.png')
var image5 = require('../assets/images/image5.png')
var image6 = require('../assets/images/image6.png')

const Cards = [{
  "id": 1,
  "title": "Set Up",
  "age": "21+",
  "dancing": "Dancing",
  "openbar": "Open Bar",
  "image": image1,
  "color": 'rgb(126, 88, 221)'
}, {
  "id": 2,
  "title": "Fall Into Diversity",
  "age": "All Ages",
  "dancing": "Diversity",
  "openbar": "Open Bar",
  "image": image2,
  "color": 'rgb(221, 83, 149)'
}, {
  "id": 3,
  "title": "DanceFridays",
  "age": "18+",
  "dancing": "Dancing",
  "openbar": "Open Bar",
  "image": image3,
  "color": 'rgb(81, 136, 219)'
}, {
  "id": 4,
  "title": "The Russian Party",
  "age": "All Ages",
  "dancing": "Music",
  "openbar": "Open Bar",
  "image": image4,
  "color": 'rgb(221, 109, 83)'
}, {
  "id": 5,
  "title": "Techno Awakening",
  "age": "21+",
  "dancing": "Comedy",
  "openbar": "Open Bar",
  "image": image5,
  "color": 'rgb(126, 88, 221)'
}, {
  "id": 6,
  "title": "Young Cali Takeover",
  "age": "18+",
  "dancing": "Dancing",
  "openbar": "Open Bar",
  "image": image6,
  "color": 'rgb(221, 83, 149)'
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
        <Image source ={x.image} resizeMode="cover" style={styles.cardImage}/>
        <View style={{flex: 1, backgroundColor: x.color, alignItems: 'center', justifyContent: 'flex-start', width: 350}}>
          <Text style={styles.titleText}>{x.title} </Text>
        </View>
        <View style={{width:350, height:70, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <View style={{flexDirection:'row', margin:15, marginTop:25,}} >
        <Text style={{fontSize:16, fontWeight:'200', color:'#444', marginTop:2}}>{x.age}</Text>
        </View>
        <View style={{flexDirection:'column'}}>
        <View style={{padding:13,  borderLeftWidth:1,borderColor:'#e3e3e3', alignItems:'center', justifyContent:'space-between'}}><Text style={{fontSize:16, fontWeight:'200', color:'#555'}}>{x.dancing}</Text></View>
        <View style={{padding:13, borderLeftWidth:1,borderColor:'#e3e3e3', alignItems:'center', justifyContent:'space-between'}}><Text style={{fontSize:16, fontWeight:'200', color:'#555'}}>{x.openbar}</Text></View>
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
            <TouchableOpacity style = {styles.buttons} onPress = {() => this.prop.toSearch()}>
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
            <TouchableOpacity style = {styles.buttons} onPress = {() => this.props.toProfile}>
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
    backgroundColor: 'transparent',
    fontSize: 26,
    fontWeight: '400',
    color: 'rgb(255, 255, 255)'
  },
   card: {
    flex: 1,
    alignItems: 'center',
    alignSelf:'center',
    borderWidth:2,
    borderColor:'#888',
    width: 350,
    height: 450,
    shadowColor: "#888"
  }

});
