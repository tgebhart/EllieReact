import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';

import {
  MKButton,
  MKColor,
  MKIconToggle,
  getTheme,
} from 'react-native-material-kit';

import LikedCardMenu from './LikedCardMenu.js'


const theme = getTheme();
const styles = require('./styles');

const LikedCardFront = React.createClass({
  render(){
    var base64Icon = 'http://www.getmdl.io/assets/demos/welcome_card.jpg';
    var action = (<Text> My action</Text>);
    var menu = (
       <MKIconToggle
        checked={true}
        onCheckedChange={this._onIconChecked}
        onPress={this._onIconClicked}
        >
        <Text pointerEvents="none"
              style={styles.toggleTextOff}>Off</Text>
        <Text state_checked={true}
              pointerEvents="none"
              style={[styles.toggleText, styles.toggleTextOn]}>On</Text>
      </MKIconToggle>
    );
    return (
        <View style={styles.container}>
            <LikedCardMenu>
            </LikedCardMenu>
          <View style={{padding: 5}}>
          </View>
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
        </View>
    )
  }
});

module.exports = LikedCardFront;
