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

import Nav from '../global-widgets/nav'
import SwipeCards from '../SwipeCards/SwipeCards.js';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

var convos = [{
  "id": 1,
  "name": "Diane",
  "message": "Suspendisse accumsan tortor quis turpis.",
  "image" : image1
}, {
  "id": 2,
  "name": "Lois",
  "message": "Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.",
  "image" : image2
}, {
  "id": 3,
  "name": "Mary",
  "message": "Duis bibendum.",
  "image" : image3
}, {
  "id": 4,
  "name": "Susan",
  "message": "Praesent blandit.",
  "image" : image4
}, {
  "id": 5,
  "name": "Betty",
  "message": "Mauris enim leo, rhoncus sed, vestibulum, cursus id, turpis.",
  "image" : image5
}, {
  "id": 6,
  "name": "Deborah",
  "message": "Aliquam sit amet diam in magna bibendum imperdiet.",
  "image" : image6
}, {
  "id": 7,
  "name": "Frances",
  "message": "Phasellus sit amet erat.",
  "image" : image7
}, {
  "id": 8,
  "name": "Joan",
  "message": "Vestibulum ante ipsum bilia Curae; Duis faucibus accumsan odio.",
  "image" : image8
}, {
  "id": 9,
  "name": "Denise",
  "message": "Aliquam non mauris.",
  "image" : image9
}, {
  "id": 10,
  "name": "Rachel",
  "message": "Nulla ac enim.",
  "image" : image10
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

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class LikedList extends Component {
  constructor(props){
    super(props)

    this.state = {
      dataSource: ds.cloneWithRows(newMatches),
      convoData: ds.cloneWithRows(convos),
    }

  }

  eachPic(x){
    return(
      <TouchableOpacity style={{alignItems:'center'}}>
      <Image source = {x.image} style={{width:70, height:70, borderRadius:35, margin:10}} />
      <Text style={{fontWeight:'600', color:'#444'}}>{x.first_name}</Text>
      </TouchableOpacity>
      )}

    convoRender(x){
      return(
              <TouchableOpacity style={{alignItems:'center', flexDirection:'row', marginTop:5, marginBottom:5, borderBottomWidth:1, borderColor:'#e3e3e3'}}>
              <Image source = {x.image} style={{width:70, height:70, borderRadius:35, margin:10}} />
              <View>
              <Text style={{fontWeight:'600', color:'#111'}}>{x.name}</Text>
              <Text
              numberOfLines ={1}
              style={{fontWeight:'400', color:'#888', width:200}}>{x.message}</Text>
              </View>
              </TouchableOpacity>)}


  render() {
    return (
      <View style = {{flex:1}}>
      <Nav type = 'likedlist' onPress = {() => this.props.navigator.replace({id:'home'})} />
      <ScrollView style={styles.container}>
      <TextInput
      style = {{height:50, }}
      placeholder="Search"
      />
      <View style={styles.matches}>
      <Text style = {{color:'#da533c', fontWeight:'600', fontSize:12}}>THIS PARTY'S BUZZING WITH BAD BITCHES</Text>
      <ListView
      horizontal={true}
      showsHorizontalScrollIndicator = {false}
    dataSource={this.state.dataSource}
    pageSize = {5}
      renderRow={(rowData) =>this.eachPic(rowData)}
      />
      </View>
      <View style = {{margin:10}}>
      <Text style = {{color:'#da533c', fontWeight:'600', fontSize:12}}>List View</Text>
      <ListView
      horizontal={false}
      scrollEnabled = {false}
      showsHorizontalScrollIndicator = {false}
    dataSource={this.state.convoData}
    pageSize = {5}
      renderRow={(rowData) =>this.convoRender(rowData)}
      />
      </View>

        </ScrollView>
        </View>
    )
}
}
//onPress = {() => this.renderNope()}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10

  },
  matches:{
  borderTopWidth:1,
  paddingTop:15,
  borderTopColor:'#da533c',
  borderBottomWidth:1,
  paddingBottom:15,
  borderBottomColor:'#e3e3e3'
  },
  buttons:{
    width:80,
    height:80,
    borderWidth:10,
    borderColor:'#fff',
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
   card: {
    flex: 1,
    alignItems: 'center',
    alignSelf:'center',
    borderWidth:2,
    borderColor:'#e3e3e3',
    width: 350,
    height: 420,
  }

});
