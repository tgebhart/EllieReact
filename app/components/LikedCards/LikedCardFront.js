import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';

import LinearGradientView from 'react-native-linear-gradient'

import LikedCardMenu from './LikedCardMenu.js'

const styles = require('./styles');
const homeStyles = require('../Home/styles')

class LikedCardFront extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
        <View style={styles.container}>
          <LikedCardMenu
            buttonColor={this.props.color}
            price={this.props.price}>
          </LikedCardMenu>
          <View style={{padding: 3}}/>
          <View style={styles.card}>
            <Image source ={{uri: this.props.image}} resizeMode="cover" style={styles.cardImage}>
              <LinearGradientView style={homeStyles.linearGradient} colors={[this.props.colorFade, this.props.color]}>
                <View style={{backgroundColor:this.props.color, marginLeft: 150, height:30, width:60, borderBottomLeftRadius:5, borderBottomRightRadius:5, justifyContent:'center', alignItems:'center'}}>
                  <Text style={homeStyles.categoryText}>{this.props.category}</Text>
                </View>
              </LinearGradientView>
            </Image>
            <View style={{flex:1, width:300, backgroundColor: this.props.color, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
              <View style={styles.titleTextContainer}>
                <Text style={styles.titleText} numberOfLines={3}>{this.props.title} </Text>
              </View>
              <View style={styles.tagContainerMaster}>
                <View style={homeStyles.tagContainer}>
                  <Text style={{color:'rgba(80,227,194,1.0)', fontSize:16, fontWeight:'bold', margin:5}}>{this.props.dancing}</Text>
                  <Text style={{color:'rgba(255,255,255,1.0)', fontSize:16, fontWeight:'bold', margin:5}}>{this.props.volume}</Text>
                </View>
                <View style={homeStyles.tagContainer}>
                  <Text style={{color:'rgba(80,227,194,1.0)', fontSize:16, fontWeight:'bold', margin:5}}>{this.props.openbar}</Text>
                  <Text style={{color:'rgba(255,255,255,1.0)', fontSize:16, fontWeight:'bold', margin:5}}>{this.props.dress}</Text>
                </View>
                <View style={homeStyles.tagContainer}>
                  <Text style={{color:'rgba(255,255,255,1.0)', fontSize:16, fontWeight:'bold', margin:5}}>{this.props.age}</Text>
                  <Text style={{color:'rgba(255,255,255,1.0)', fontSize:16, fontWeight:'bold', margin:5}}>{this.props.friends} friends</Text>
                </View>
              </View>
              <View style={styles.bottomInfoContainer}>
                <Text style={homeStyles.bottomInfoText}>{this.props.distance} miles</Text>
                <Text style={homeStyles.bottomInfoText}>{this.props.price} </Text>
                <Text style={homeStyles.bottomInfoText}>{this.props.start_time} </Text>
              </View>
            </View>
          </View>
        </View>
    )
  }
}

export default LikedCardFront;
